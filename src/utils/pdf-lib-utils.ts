/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { logger } from "@/lib/logger";
import type { PDFContext, PDFDocument } from "pdf-lib";
import { PDFDict, PDFHexString, PDFRef } from "pdf-lib";

import { PDFName } from "pdf-lib";

export type PDFOutlineItem = {
  title: string;
  to: PDFOutlineTo;
  italic?: boolean;
  bold?: boolean;
};

export type PDFOutlineItemWithChildren = {
  to?: PDFOutlineTo;
  children: PDFOutline[];
  open: boolean;
} & Omit<PDFOutlineItem, "to">;

type PDFOutlineTo =
  | number
  | [pageIndex: number, xPercentage: number, yPercentage: number];

export type PDFOutline = PDFOutlineItem | PDFOutlineItemWithChildren;

const walk = (
  outlines: readonly PDFOutline[],
  callback: (outline: PDFOutline) => boolean | undefined,
) => {
  for (const outline of outlines) {
    const ret = callback(outline);
    if ("children" in outline && ret !== false)
      walk(outline.children, callback);
  }
};

const flatten = (outlines: readonly PDFOutline[]) => {
  const result: PDFOutline[] = [];

  walk(outlines, (outline) => void result.push(outline));
  return result;
};

const getOpeningCount = (outlines: readonly PDFOutline[]) => {
  let count = 0;

  walk(outlines, (outline) => {
    count += 1;
    return !("open" in outline && !outline.open);
  });

  return count;
};

export const setOutline = async (
  doc: PDFDocument,
  outlines: readonly PDFOutline[],
) => {
  // Refs
  const rootRef = doc.context.nextRef();
  const refMap = new WeakMap<PDFOutline, PDFRef>();

  for (const outline of flatten(outlines)) {
    refMap.set(outline, doc.context.nextRef());
  }

  const pageRefs = (() => {
    const refs: PDFRef[] = [];

    doc.catalog.Pages().traverse((kid, ref) => {
      if (kid.get(kid.context.obj("Type"))?.toString() === "/Page") {
        refs.push(ref);
      }
    });

    return refs;
  })();

  // Outlines
  const createOutline = (outlines: readonly PDFOutline[], parent: PDFRef) => {
    const { length } = outlines;

    for (let i = 0; i < length; i += 1) {
      const outline = outlines[i];
      const outlineRef = refMap.get(outline)!;

      const destOrAction = (() => {
        if (typeof outline.to === "number") {
          return { Dest: [pageRefs[outline.to], "Fit"] };
        } else if (Array.isArray(outline.to)) {
          const page = doc.getPage(outline.to[0]);
          const width = page.getWidth();
          const height = page.getHeight();

          return {
            Dest: [
              pageRefs[outline.to[0]],
              "XYZ",
              width * outline.to[1],
              height * outline.to[2],
              null,
            ],
          };
        }
        return {};
      })();

      const childrenDict = (() => {
        if ("children" in outline && outline.children.length > 0) {
          createOutline(outline.children, outlineRef);

          return {
            First: refMap.get(outline.children[0])!,
            Last: refMap.get(outline.children[outline.children.length - 1])!,
            Count: getOpeningCount(outline.children) * (outline.open ? 1 : -1),
          };
        }
        return {};
      })();

      doc.context.assign(
        outlineRef,
        doc.context.obj({
          Title: PDFHexString.fromText(outline.title),
          Parent: parent,
          ...(i > 0 ? { Prev: refMap.get(outlines[i - 1])! } : {}),
          ...(i < length - 1 ? { Next: refMap.get(outlines[i + 1])! } : {}),
          ...childrenDict,
          ...destOrAction,
          F: (outline.italic ? 1 : 0) | (outline.bold ? 2 : 0),
        }),
      );
    }
  };

  createOutline(outlines, rootRef);

  // Root
  const rootCount = getOpeningCount(outlines);

  doc.context.assign(
    rootRef,
    doc.context.obj({
      Type: "Outlines",
      ...(rootCount > 0
        ? {
            First: refMap.get(outlines[0])!,
            Last: refMap.get(outlines[outlines.length - 1])!,
          }
        : {}),
      Count: rootCount,
    }),
  );

  doc.catalog.set(doc.context.obj("Outlines"), rootRef);
};

type Bookmark = {
  title: string;
  destination?: number | undefined | string; // Adjust type based on what you extract from Dest
  children: Bookmark[];
};

export const getBookmarks = (doc: PDFDocument): Bookmark[] => {
  // Access the PDF Catalog
  const catalog = doc.context.lookup(doc.context.trailerInfo.Root, PDFDict);

  // Check for the Outlines entry
  const outlines = catalog.get(PDFName.of("Outlines"));
  if (!outlines) {
    logger.warn("No bookmarks (outlines) found.");
    return [];
  }

  // Parse the Outlines dictionary
  const outlinesDict = doc.context.lookup(outlines, PDFDict);

  doc.catalog.Pages().traverse((kid, ref) => {
    logger.info(`Page: ${ref.tag}`);
    logger.info(`kid: ${kid}`);
  });

  return traverseOutline(outlinesDict, doc.context, doc);
};

const resolveDestination = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dest: any,
  doc: PDFDocument,
): number | undefined => {
  if (Array.isArray(dest)) {
    // Explicit destination array
    const pageRef = dest[0]; // First element is the page reference
    const pageIndex = doc.getPages().findIndex((page) => page.ref === pageRef);

    if (pageIndex >= 0) {
      return pageIndex;
    }
  } else if (typeof dest === "string") {
    // Named destination
    const namedDest = doc.context.lookupMaybe(PDFName.of(dest), PDFDict);
    if (namedDest) {
      const pageRef = namedDest.get(PDFName.of("Page"));
      const pageIndex = doc
        .getPages()
        .findIndex((page) => page.ref === pageRef);

      if (pageIndex >= 0) {
        return pageIndex;
      }
    }
  } else if (dest instanceof PDFRef) {
    // Indirect reference to a destination
    const resolvedDest = doc.context.lookup(dest);
    return resolveDestination(resolvedDest, doc);
  }

  return undefined; // For invalid or unsupported types
};

const traverseOutline = (
  outline: PDFDict,
  context: PDFContext,
  doc: PDFDocument,
): Bookmark[] => {
  const bookmarks: Bookmark[] = [];

  let current: PDFDict | null = outline;

  while (current) {
    logger.info(`Current: ${current.values()}`);
    const titleRaw = current.get(PDFName.of("Title"));
    const title = titleRaw
      ? current.lookup(PDFName.of("Title"), PDFHexString).decodeText()
      : "Untitled";

    const destRaw = current.get(PDFName.of("Dest"));
    const destination = destRaw
      ? context.lookup(destRaw, PDFHexString).decodeText()
      : undefined;

    const firstChildRef = current.get(PDFName.of("First"));
    const children = firstChildRef
      ? traverseOutline(context.lookup(firstChildRef, PDFDict), context, doc)
      : [];

    bookmarks.push({
      title,
      destination,
      children,
    });

    const nextRef = current.get(PDFName.of("Next"));
    current = nextRef ? context.lookup(nextRef, PDFDict) : null;
  }

  return bookmarks;
};

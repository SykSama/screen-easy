"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Reorder } from "framer-motion";
import { GripVertical, Info, Trash2 } from "lucide-react";
import * as React from "react";

type Item = {
  id: string;
  title: string;
  description: string;
  duration: number;
  resizeMode: "cover" | "contain" | "fill";
};

export default function ReorderableList() {
  const [items, setItems] = React.useState<Item[]>([
    {
      id: "1",
      title: "Beautiful Sunset",
      description: "A stunning view of the sun setting over the ocean",
      duration: 5,
      resizeMode: "cover",
    },
    {
      id: "2",
      title: "Mountain Peak",
      description: "Snow-capped mountain reaching into the clouds",
      duration: 3,
      resizeMode: "contain",
    },
    {
      id: "3",
      title: "Forest Path",
      description: "A serene path winding through a dense forest",
      duration: 4,
      resizeMode: "fill",
    },
    {
      id: "4",
      title: "Urban Landscape",
      description: "Modern cityscape with towering skyscrapers",
      duration: 6,
      resizeMode: "cover",
    },
    {
      id: "5",
      title: "Desert Dunes",
      description: "Rolling sand dunes stretching to the horizon",
      duration: 5,
      resizeMode: "contain",
    },
  ]);

  const updateDuration = (id: string, duration: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, duration } : item)),
    );
  };

  const updateResizeMode = (
    id: string,
    resizeMode: "cover" | "contain" | "fill",
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, resizeMode } : item)),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-4xl p-6">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="mb-4 text-2xl font-bold">Reorderable Items</h2>
              <div className="grid grid-cols-[40px_1fr_120px_140px_40px] items-center gap-4 border-b pb-2">
                <div className="w-5" /> {/* Drag handle space */}
                <div className="font-medium">Content</div>
                <div className="flex items-center justify-end gap-2">
                  <Label className="text-sm text-muted-foreground">
                    Duration
                  </Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Display time in seconds for each item</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">
                    Resize Mode
                  </Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>How the content should be resized:</p>
                      <ul className="ml-4 mt-1 list-disc text-sm">
                        <li>Cover: Fill while maintaining aspect ratio</li>
                        <li>Contain: Show all content within bounds</li>
                        <li>Fill: Stretch to fill the space</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div /> {/* Delete button space */}
              </div>
            </div>
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={setItems}
              className="space-y-3"
            >
              {items.map((item) => (
                <Reorder.Item key={item.id} value={item} className="list-none">
                  <div className="group relative rounded-lg bg-card p-4 transition-colors hover:bg-accent/50">
                    <div className="grid grid-cols-[40px_1fr_120px_140px_40px] items-center gap-4">
                      <div className="cursor-move text-muted-foreground hover:text-foreground">
                        <GripVertical className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">{item.title}</h3>
                        <p className="truncate text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <div>
                        <Input
                          type="number"
                          value={item.duration}
                          onChange={(e) =>
                            updateDuration(
                              item.id,
                              parseInt(e.target.value, 10),
                            )
                          }
                          min={1}
                          className="h-9"
                          aria-label="Duration in seconds"
                        />
                      </div>

                      <div>
                        <Select
                          value={item.resizeMode}
                          onValueChange={(
                            value: "cover" | "contain" | "fill",
                          ) => updateResizeMode(item.id, value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cover">Cover</SelectItem>
                            <SelectItem value="contain">Contain</SelectItem>
                            <SelectItem value="fill">Fill</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Trash2 className="size-4 text-destructive" />
                        <span className="sr-only">Delete item</span>
                      </Button>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

"use client";

import { LoadingButton } from "@/components/loading-button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Enums } from "@/types";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Price, ProductWithPrices, Rules } from "./queries/queries";

export type PricingSectionProps = {
  products: ProductWithPrices[];
};

type Interval = Enums<"pricing_plan_interval">;
type BillingInterval = "year" | "month";

export const PricingSection = ({ products }: PricingSectionProps) => {
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");

  const intervals = Array.from(
    new Set(
      products
        .flatMap((product) => product.prices.map((price) => price.interval))
        .filter((interval): interval is Interval => interval !== null),
    ),
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PricingSwitch
        intervals={intervals}
        value={billingInterval}
        onChange={setBillingInterval}
      />

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const price = product.prices.find(
            (price) => price.interval === billingInterval,
          );

          if (!price || !product.rules) {
            return null;
          }

          return (
            <PricingCard
              key={product.id}
              price={price}
              rules={product.rules}
              name={product.name ?? ""}
            />
          );
        })}
      </div>
    </div>
  );
};

type PricingSwitchProps = {
  intervals: Interval[];
  value: BillingInterval;
  onChange: (interval: BillingInterval) => void;
};

const PricingSwitch = ({
  intervals,
  value,
  onChange,
}: PricingSwitchProps): ReactNode => {
  return (
    <div className="flex justify-center">
      <Tabs
        value={value}
        onValueChange={(interval) => onChange(interval as BillingInterval)}
        className="w-fit"
      >
        <TabsList className="bg-black">
          {intervals.map((interval) => (
            <TabsTrigger key={interval} value={interval} className="capitalize">
              {interval}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

type PricingCardProps = {
  price: Price;
  rules: Rules;
  name: string;
};

const PricingCard = ({ price, rules, name }: PricingCardProps) => (
  <div className="relative flex w-72 flex-col rounded-xl border bg-zinc-800 p-6 shadow-sm">
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold leading-none tracking-tight">
          {name}
        </h3>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency ?? "USD",
            minimumFractionDigits: 0,
          }).format((price.unit_amount ?? 0) / 100)}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          /{price.interval}
        </span>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <div className="text-sm font-medium">What&apos;s included:</div>
        <ul className="space-y-2 text-sm">
          <CheckItem text={`${rules.collections_allowed ?? 0} collections`} />
          <CheckItem
            text={`${rules.medias_per_collection_allowed ?? 0} screenshots per collection`}
          />
          <CheckItem text={`${rules.screens_allowed ?? 0} screens`} />
        </ul>
      </div>

      {/* Button */}
      <div className="mt-4">
        <LoadingButton className="w-full" variant="default">
          Get Started
        </LoadingButton>
      </div>
    </div>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-2">
    <svg
      className=" size-4 shrink-0"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
    <span className="text-muted-foreground">{text}</span>
  </li>
);

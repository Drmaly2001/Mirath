"use client";

import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeirCounterProps {
  label: string;
  icon?: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function HeirCounter({
  label,
  icon,
  value,
  onChange,
  min = 0,
  max = 20,
}: HeirCounterProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-white px-4 py-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-lg"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-lg font-bold tabular-nums">
          {value}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-lg"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

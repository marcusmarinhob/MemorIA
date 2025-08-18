import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[#edbf21]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary hover:bg-primary/80",
        secondary:
          "border-transparent bg-[#edbf21] text-black hover:bg-[#edbf21]/80",
        destructive:
          "border-transparent bg-destructive hover:bg-destructive/80",
        outline: "border border-[#edbf21]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

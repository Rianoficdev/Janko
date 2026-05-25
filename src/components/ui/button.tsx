import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black shadow-[0_0_34px_rgba(255,255,255,0.18)] hover:scale-[1.02] hover:bg-amber-50",
        premium:
          "bg-[linear-gradient(135deg,#f6c84c,#ffd86b)] text-black shadow-[0_0_42px_rgba(250,204,21,0.28)] hover:scale-[1.02] hover:shadow-[0_0_56px_rgba(250,204,21,0.36)]",
        ghost: "text-zinc-200 hover:bg-white/10 hover:text-white",
        outline: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        dark: "bg-zinc-950 text-white hover:bg-zinc-800",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-7 text-base",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonProps = asChild ? props : { type: "button" as const, ...props };

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...buttonProps} />;
  },
);

Button.displayName = "Button";

export { buttonVariants };

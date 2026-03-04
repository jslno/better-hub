"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
	"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-tooltip-content-transform-origin) rounded-md border px-3 py-1.5 text-sm shadow-md",
	{
		variants: {
			variant: {
				default: "bg-background text-popover-foreground border-border",
				primary: "bg-foreground text-background border-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function TooltipProvider({
	delayDuration = 300,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delayDuration={delayDuration}
			{...props}
		/>
	);
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipPortal({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Portal>) {
	return <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />;
}

function TooltipContent({
	className,
	sideOffset = 4,
	withArrow = false,
	variant = "default",
	children,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
	VariantProps<typeof tooltipVariants> & {
		withArrow?: boolean;
	}) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				data-slot="tooltip-content"
				sideOffset={sideOffset}
				className={cn(
					tooltipVariants({ variant }),
					!withArrow && "overflow-hidden",
					className,
				)}
				{...props}
			>
				{children}
				{withArrow && (
					<div
						className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
						style={{
							borderLeft: "4px solid transparent",
							borderRight: "4px solid transparent",
							borderTop: `4px solid ${variant === "primary" ? "var(--foreground)" : "var(--background)"}`,
						}}
					/>
				)}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
}

function TooltipArrow({
	className,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Arrow>) {
	return (
		<TooltipPrimitive.Arrow
			data-slot="tooltip-arrow"
			className={cn("fill-background", className)}
			{...props}
		/>
	);
}

export { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger };

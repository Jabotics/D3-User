import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  state: "open" | "closed";
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, state, ...props }, ref) => {
  const isOpen = state === "open";
  const isSm = window.innerWidth > 400;

  const hiddenRoutes = ["/"];
  const shouldHaveTheStyle = hiddenRoutes.includes(window.location.pathname);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-md font-medium transition-all",
          className
        )}
        {...props}
      >
        {shouldHaveTheStyle && (
          <span className="flex items-center gap-2">
            <FaCircle size={7} /> &nbsp;{children}
          </span>
        )}
        {shouldHaveTheStyle ? isOpen ? (
          <FaMinus
            className={`${
              isSm ? "h-4 w-4" : "h-2 w-2"
            } shrink-0 text-muted-foreground transition-transform duration-200`}
          />
        ) : (
          <FaPlus
            className={`${
              isSm ? "h-4 w-4" : "h-2 w-2"
            } shrink-0 text-muted-foreground transition-transform duration-200`}
          />
        ) : null}
        {!shouldHaveTheStyle && children}
        {!shouldHaveTheStyle && (
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "pb-4 pt-4 pl-5 text-xs text-gray-500 font-medium border-t-[1px] border-gray-200",
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

import type { ComponentPropsWithRef, ForwardedRef, KeyboardEvent } from "react";
import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MenuItemProps extends ComponentPropsWithRef<"li"> {
  onClick: () => void;
}

const MenuItem = (
  { children, onClick, className, ...attributes }: MenuItemProps,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const handleEnterKeyPress = useCallback(
    (event: KeyboardEvent<HTMLLIElement>) => {
      if (event.key === "Enter") {
        onClick();
      }
    },
    [onClick],
  );

  return (
    <li
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleEnterKeyPress}
      className={cn(
        "flex items-center py-3 px-4 text-sm cursor-pointer transition-colors duration-200 ease-in hover:bg-backgroundActive",
        className,
      )}
      {...attributes}
    >
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default forwardRef(MenuItem);

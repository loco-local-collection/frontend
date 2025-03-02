import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface MenuProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
  renderId?: string;
}

const Menu = ({
  isOpen,
  onClose,
  renderId,
  children,
  className,
  ...props
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [renderElement, setRenderElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setRenderElement(
        renderId ? document.getElementById(renderId) : document.body,
      );
    }
  }, [renderId]);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // 클릭 오작동 방지
    const timer = setTimeout(() => {
      window.addEventListener("click", handleBackdropClick);
      window.addEventListener("keydown", handleEscClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleBackdropClick);
      window.removeEventListener("keydown", handleEscClick);
    };
  }, [onClose]);

  if (!renderElement) return null;

  return createPortal(
    isOpen && (
      <div
        ref={menuRef}
        className={cn(
          "absolute top-10 flex flex-col min-w-[10rem] py-4 bg-main rounded-md shadow-md z-50",
          className,
        )}
        {...props}
      >
        <ul>{children}</ul>
      </div>
    ),
    renderElement,
  );
};

Menu.displayName = "Menu";

export default Menu;

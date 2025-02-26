import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  variant?: "default" | "confirm" | "form";
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  variant = "default",
  title,
  description,
  children,
  onClose,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        {description && <p className="text-gray-600 mt-2">{description}</p>}

        {/* Content */}
        <div className="mt-4">{children}</div>

        {/* Footer (Confirm & Cancel Buttons) */}
        {variant !== "default" && (
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" styleType="outlined" onClick={onClose}>
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                variant={variant === "confirm" ? "destructive" : "primary"}
                styleType="filled"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

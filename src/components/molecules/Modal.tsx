import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../atoms/Button";

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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
      onClick={onClose} // 모달 외부 클릭 시 닫기
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 버블링 방지
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <Button
            variant="secondary"
            styleType="transparent"
            onClick={onClose}
            className="p-2"
            aria-label="닫기"
          >
            <X size={20} />
          </Button>
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

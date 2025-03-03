import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // X 아이콘 사용
import { Button } from "./Button";

type ToastProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "warning" | "error"; // 타입 추가 (기본값: success)
};

const toastStyles = {
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-black",
  error: "bg-red-500 text-white",
};

export const Toast = ({
  message,
  isOpen,
  onClose,
  type = "success", // 기본값을 success로 설정
}: ToastProps) => {
  return (
    isOpen && (
      <div
        className={cn(
          "fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center",
          toastStyles[type]
        )}
        role="alert"
      >
        <span className={cn("flex-1")}>{message}</span>{" "}
        {/* 메시지 영역에 남은 공간을 차지하도록 설정 */}
        <Button
          className="ml-4 p-1 text-sm text-gray-400 hover:text-white"
          variant="danger"
          onClick={onClose}
        >
          <X size={16} /> {/* X 아이콘 추가 */}
        </Button>
      </div>
    )
  );
};

import { useCallback, useEffect, useState } from "react";

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000); // 3초 후 자동으로 토스트를 숨김
      return () => clearTimeout(timer); // 클린업 타이머
    }
  }, [isOpen, hideToast]);

  return {
    isOpen,
    message,
    showToast,
    hideToast,
  };
};

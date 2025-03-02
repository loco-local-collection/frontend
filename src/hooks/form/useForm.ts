import { useState } from "react";

export const useForm = <T extends Record<string, string | number | boolean>>(
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // ✅ 체크박스일 경우 checked 값 사용
    const newValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm };
};

import { useState } from "react";

export const useCheckbox = (initialChecked = false) => {
  const [checked, setChecked] = useState(initialChecked);

  const toggle = () => setChecked((prev) => !prev);

  return { checked, onChange: toggle };
};

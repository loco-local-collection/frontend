import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export interface DropdownOption<T = string> {
  label: string;
  value: Exclude<T, undefined>;
}

export interface DropdownProps<
  T extends string | number | readonly string[] = string,
> extends Omit<ComponentPropsWithoutRef<"select">, "onChange" | "value"> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label?: string;
  containerClassName?: string;
  selectClassName?: string;
}

export const Dropdown = <T extends string | number | readonly string[]>({
  value,
  options,
  onChange,
  label,
  containerClassName = "",
  selectClassName = "",
  ...props
}: DropdownProps<T>) => {
  const generatedId = useId();
  const selectId = props.id || generatedId;

  return (
    <div className={cn(containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          "w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
          "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
          selectClassName,
        )}
        aria-label={label || props["aria-label"]}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value.toString()}
            value={option.value}
            aria-selected={value === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

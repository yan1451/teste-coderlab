import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";

interface SelectComponentProps<T> {
  options: T[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
  setSelectedValue?: React.Dispatch<React.SetStateAction<any>>;
  onValueChangeCustom?: (value: any) => void;
  labelKey?: keyof T;
  valueKey?: keyof T;
}

export function SelectComponent<T extends { [key: string]: any }>({
  options,
  setSelectedValue,
  onValueChangeCustom,
  placeholder,
  disabled,
  className,
  labelKey,
  valueKey,
}: SelectComponentProps<T>) {
  return (
    <Select
      onValueChange={(value) => {
        if (onValueChangeCustom) {
          onValueChangeCustom(value);
        } else if (setSelectedValue) {
          setSelectedValue(value);
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger
        className={`w-[200px] text-white data-[placeholder]:text-white ${className || ''}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel
            className={`text-sm font-medium text-gray-700 ${className || ''}`}
          >
            {placeholder}
          </SelectLabel>
          {options.map((option, index) => (
            <SelectItem
              key={index}
              value={valueKey ? option[valueKey] : option}
              className="text-sm font-medium text-black"
            >
              {labelKey ? option[labelKey] : option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

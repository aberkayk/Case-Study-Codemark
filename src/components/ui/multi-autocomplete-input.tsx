import * as React from "react";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Badge } from "./badge";

type Props = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface MultiAutocompleteInputProps extends Props {
  selectedItems: string[] | undefined;
  onValueChange: (item: string[]) => void;
  options: { label: string; value: string }[];
  name: string;
  disabledPopover?: boolean;
  maxLength?: number;
}

const MultiAutocompleteInput = ({
  className,
  selectedItems,
  onValueChange,
  options,
  name,
  disabled,
  disabledPopover = false,
  maxLength,
}: MultiAutocompleteInputProps) => {
  const [open, setOpen] = React.useState(false);
  const labels = options
    .filter((item) => (selectedItems || []).includes(item.value))
    .map((item) => item.label);

  const values = options
    .filter((item) => (selectedItems || []).includes(item.value))
    .map((item) => item.value);

  const input = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      aria-label={`${name} Seç`}
      className={cn("w-full justify-between", className)}
      disabled={disabled}
    >
      <div className="flex gap-1 font-bold">
        {labels?.map((label) => (
          <Badge variant="outline" key={label}>
            {label}
          </Badge>
        ))}
      </div>
      <div className="ml-auto flex space-x-4">
        {selectedItems && (
          <XIcon
            className="h-4 w-4 shrink-0 opacity-50"
            onClick={() => onValueChange([])}
          />
        )}

        {!disabled && <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />}
      </div>
    </Button>
  );

  const onSelect = (value: string) => {
    const index = values.indexOf(value);
    if (index !== -1) {
      values.splice(index, 1);
    } else if (maxLength && values.length === maxLength) {
      return;
    } else {
      values.push(value);
    }
    setOpen(false);
    onValueChange(values);
  };

  const element = (
    <>
      {input}
      {!disabled && (
        <Command>
          <CommandList style={{ height: disabledPopover ? 200 : "auto" }}>
            <CommandInput placeholder={`Search ${name}...`} />
            <CommandEmpty> {name} bulunamadı.</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => onSelect(option.value)}
                className="text-sm"
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedItems?.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      )}
    </>
  );

  if (disabledPopover) return element;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{input}</PopoverTrigger>
      <PopoverContent className="w-full min-w-[550px] p-0">
        {element}
      </PopoverContent>
    </Popover>
  );
};

export default MultiAutocompleteInput;

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

type Props = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface AutocompleteInputProps extends Props {
  selectedItem: string | undefined;
  onValueChange: (item: string) => void;
  options: { label: string; value: string }[];
  name: string;
  disabledPopover?: boolean;
}

const AutocompleteInput = ({
  className,
  selectedItem,
  onValueChange,
  options,
  name,
  disabled,
  disabledPopover = false,
}: AutocompleteInputProps) => {
  const [open, setOpen] = React.useState(false);
  const label = options.find((item) => item.value === selectedItem)?.label;

  const input = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      aria-label={`${name} Seç`}
      className={cn("w-full justify-between", className)}
      disabled={disabled}
    >
      {label}
      <div className="ml-auto flex space-x-4">
        {selectedItem && (
          <XIcon
            className="h-4 w-4 shrink-0 opacity-50"
            onClick={() => onValueChange("")}
          />
        )}

        {!disabled && <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />}
      </div>
    </Button>
  );

  const element = (
    <>
      {input}
      {!disabled && (
        <Command>
          <CommandList style={{ height: disabledPopover ? 200 : "auto" }}>
            <CommandInput placeholder={`${name} ara...`} />
            <CommandEmpty> {name} bulunamadı.</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
                className="text-sm"
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedItem === option.value ? "opacity-100" : "opacity-0"
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

export default AutocompleteInput;

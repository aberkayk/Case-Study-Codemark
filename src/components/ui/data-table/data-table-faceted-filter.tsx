import * as React from "react";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";
import { Badge } from "../badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import { cn } from "../../../lib/utils";

interface DataTableFacetedFilterProps {
  title?: string;
  options: {
    label: string;
    value: any;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onChange?: (selectedUserId: number | undefined) => void;
  onReset: () => void;
  selectedValue: string | null;
  selectedLabel?: string;
}

export function DataTableFacetedFilter({
  title,
  options,
  onChange,
  onReset,
  selectedValue,
  selectedLabel,
}: DataTableFacetedFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="default" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedLabel && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedLabel}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                const newValue = isSelected ? undefined : option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (onChange) onChange(newValue);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={onReset}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

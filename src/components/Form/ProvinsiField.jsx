import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const ProvinsiField = ({ form, provinsi, onChoosingLocation, setKota }) => {
  return (
    <FormField
      control={form.control}
      name="provinsi"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Provinsi</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? provinsi.find((prov) => prov.name === field.value)?.name
                    : "Select language"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              id="provinsi-combobox"
              className="z-[150] max-h-80 w-[200px] overflow-y-scroll p-0"
            >
              <Command>
                <CommandInput placeholder="Cari Provinsi..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {provinsi.map((prov) => (
                    <CommandItem
                      value={prov.name}
                      key={prov.name}
                      onSelect={() => {
                        form.setValue("provinsi", prov.name);
                        onChoosingLocation(prov.id, "provinsiId");
                        setKota(undefined);
                        form.setValue("kab_kota", undefined);
                      }}
                    >
                      {prov.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          prov.name === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProvinsiField;

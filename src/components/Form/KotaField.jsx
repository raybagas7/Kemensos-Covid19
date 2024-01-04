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

const KotaField = ({ form, kota, onChoosingLocation }) => {
  return (
    <FormField
      control={form.control}
      name="kab_kota"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Kabupaten/Kota</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={kota === undefined}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? kota.find((kota) => kota.name === field.value)?.name
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
                <CommandInput placeholder="Cari Kota..." className="h-9" />
                <CommandEmpty>Kab/Kota tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {kota &&
                    kota.map((kota) => (
                      <CommandItem
                        value={kota.name}
                        key={kota.name}
                        onSelect={() => {
                          form.setValue("kab_kota", kota.name);
                          onChoosingLocation(kota.id, "kotaId");
                        }}
                      >
                        {kota.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            kota.name === field.value
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

export default KotaField;

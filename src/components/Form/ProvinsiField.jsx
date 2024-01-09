import React, { useEffect, useState } from "react";
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
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const ProvinsiField = ({
  form,
  provinsi,
  onChoosingLocation,
  setProvinsi,
  setKota,
  setKecamatan,
  setKelurahan,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!provinsi) {
      const getProvinsi = async () => {
        try {
          const response = await fetch("/api/provinsi");
          const provinsiData = await response.json();
          setTimeout(() => {
            setProvinsi(provinsiData);
          }, 1000);
        } catch (error) {
          toast("Gagal mendapatkan data provinsi", {
            type: "error",
            style: { backgroundColor: "#FF0000", color: "#FFFFFF" },
          });
        }
      };
      getProvinsi();
    }
  }, [provinsi, setProvinsi]);

  return (
    <FormField
      control={form.control}
      name="provinsi"
      render={({ field }) => (
        <FormItem className="mt-6 flex flex-col">
          <FormLabel>
            Provinsi<span className="text-red-500">*</span>
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={provinsi === undefined}
                  aria-expanded={open}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    provinsi.find((prov) => prov.name === field.value)?.name
                  ) : provinsi === undefined ? (
                    <div className="flex items-center gap-3">
                      <p>Mengambil data provinsi</p>
                      <ReloadIcon className="animate-spin" />
                    </div>
                  ) : (
                    "Pilih Provinsi"
                  )}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              id="provinsi-combobox"
              className="z-[150] max-h-80 w-full overflow-y-scroll p-0"
            >
              <Command>
                <CommandInput placeholder="Cari Provinsi..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {provinsi &&
                    provinsi.map((prov) => (
                      <CommandItem
                        value={prov.name}
                        key={prov.name}
                        onSelect={() => {
                          if (form.getValues("provinsi") !== prov.name) {
                            setKota(undefined);
                            setKecamatan(undefined);
                            setKelurahan(undefined);
                            form.setValue("kab_kota", undefined);
                            form.setValue("kecamatan", undefined);
                            form.setValue("kelurahan_desa", undefined);
                          }
                          form.setValue("provinsi", prov.name);
                          onChoosingLocation(prov.id, "provinsiId");
                          setOpen(false);
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

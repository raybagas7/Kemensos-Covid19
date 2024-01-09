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

const KotaField = ({
  form,
  kota,
  onChoosingLocation,
  setKota,
  setKecamatan,
  setKelurahan,
  locationId,
}) => {
  const [open, setOpen] = useState(false);
  const [firstInitiate, setFirstInitiate] = useState(true);

  useEffect(() => {
    if (locationId.provinsiId) {
      const getKota = async () => {
        try {
          const response = await fetch(
            `/api/kota?provinsiId=${locationId.provinsiId}`,
          );
          const getDataKota = await response.json();
          if (firstInitiate) {
            setFirstInitiate(false);
          }
          setTimeout(() => {
            setKota(getDataKota);
          }, 1000);
        } catch (error) {
          toast("Gagal mendapatkan data kota", {
            type: "error",
            style: { backgroundColor: "#FF0000", color: "#FFFFFF" },
          });
        }
      };
      getKota();
    }
  }, [locationId.provinsiId, setKota, firstInitiate]);

  const isLoading = () => {
    if (firstInitiate) {
      return (
        <div className=" text-destructive">Pilih provinsi terlebih dahulu</div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <p>Mengambil data kota</p>
        <ReloadIcon className="animate-spin" />
      </div>
    );
  };

  return (
    <FormField
      control={form.control}
      name="kab_kota"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="leading-6">
            Kabupaten/Kota<span className="text-red-500">*</span>
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  aria-expanded={open}
                  disabled={kota === undefined}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? kota.find((kota) => kota.name === field.value)?.name
                    : kota === undefined
                      ? isLoading()
                      : "Pilih Kota"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              id="provinsi-combobox"
              className="z-[150] max-h-80 w-full overflow-y-scroll p-0"
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
                          if (form.getValues("kab_kota") !== kota.name) {
                            setKecamatan(undefined);
                            setKelurahan(undefined);
                            form.setValue("kecamatan", undefined);
                            form.setValue("kelurahan_desa", undefined);
                          }
                          form.setValue("kab_kota", kota.name);
                          onChoosingLocation(kota.id, "kotaId");
                          setOpen(false);
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

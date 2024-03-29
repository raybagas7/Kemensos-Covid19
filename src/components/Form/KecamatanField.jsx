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

const KecamatanField = ({
  form,
  kecamatan,
  setKecamatan,
  onChoosingLocation,
  setKelurahan,
  locationId,
}) => {
  const [open, setOpen] = useState(false);
  const [firstInitiate, setFirstInitiate] = useState(true);

  useEffect(() => {
    if (locationId.kotaId) {
      const getKecamatan = async () => {
        try {
          const response = await fetch(
            `/api/kecamatan?kotaId=${locationId.kotaId}`,
          );
          const getDataKecamatan = await response.json();
          if (firstInitiate) {
            setFirstInitiate(false);
          }
          setTimeout(() => {
            setKecamatan(getDataKecamatan);
          }, 1000);
        } catch (error) {
          toast("Gagal mendapatkan data kecamatan", {
            type: "error",
            style: { backgroundColor: "#FF0000", color: "#FFFFFF" },
          });
        }
      };
      getKecamatan();
    }
  }, [locationId.kotaId, setKecamatan, firstInitiate]);

  const isLoading = () => {
    if (firstInitiate) {
      return (
        <div className=" text-destructive">Pilih kota terlebih dahulu</div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <p>Mengambil data kecamatan</p>
        <ReloadIcon className="animate-spin" />
      </div>
    );
  };

  return (
    <FormField
      control={form.control}
      name="kecamatan"
      render={({ field }) => (
        <FormItem className="flex flex-col ">
          <FormLabel className="leading-6">
            Kecamatan<span className="text-red-500">*</span>
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  aria-expanded={open}
                  disabled={kecamatan === undefined}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? kecamatan.find(
                        (kecamatan) => kecamatan.name === field.value,
                      )?.name
                    : kecamatan === undefined
                      ? isLoading()
                      : "Pilih Kecamatan"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              id="provinsi-combobox"
              className="z-[150] max-h-80 w-full overflow-y-scroll p-0"
            >
              <Command>
                <CommandInput placeholder="Cari Kecamatan..." className="h-9" />
                <CommandEmpty>Kecamatan tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {kecamatan &&
                    kecamatan.map((kecamatan) => (
                      <CommandItem
                        value={kecamatan.name}
                        key={kecamatan.name}
                        onSelect={() => {
                          if (form.getValues("kecamatan") !== kecamatan.name) {
                            setKelurahan(undefined);
                            form.setValue("kelurahan_desa", undefined);
                          }
                          form.setValue("kecamatan", kecamatan.name);
                          onChoosingLocation(kecamatan.id, "kecamatanId");
                          setOpen(false);
                        }}
                      >
                        {kecamatan.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            kecamatan.name === field.value
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

export default KecamatanField;

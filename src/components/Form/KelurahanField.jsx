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

const KelurahanField = ({
  form,
  kelurahan,
  setKelurahan,
  onChoosingLocation,
  locationId,
}) => {
  const [open, setOpen] = useState(false);
  const [firstInitiate, setFirstInitiate] = useState(true);

  useEffect(() => {
    if (locationId.kecamatanId) {
      const getKelurahan = async () => {
        try {
          const response = await fetch(
            `/api/kelurahan?kecamatanId=${locationId.kecamatanId}`,
          );
          const getDataKelurahan = await response.json();
          if (firstInitiate) {
            setFirstInitiate(false);
          }
          setTimeout(() => {
            setKelurahan(getDataKelurahan);
          }, 1000);
        } catch (error) {
          toast("Gagal mendapatkan data kelurahan", {
            type: "error",
            style: { backgroundColor: "#FF0000", color: "#FFFFFF" },
          });
        }
      };
      getKelurahan();
    }
  }, [locationId.kecamatanId, setKelurahan, firstInitiate]);

  const isLoading = () => {
    if (firstInitiate) {
      return (
        <div className=" text-destructive">Pilih kecamatan terlebih dahulu</div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <p>Mengambil data kelurahan</p>
        <ReloadIcon className="animate-spin" />
      </div>
    );
  };

  return (
    <FormField
      control={form.control}
      name="kelurahan_desa"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="leading-6">
            Kelurahan/Desa<span className="text-red-500">*</span>
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  aria-expanded={open}
                  disabled={kelurahan === undefined}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? kelurahan.find(
                        (kelurahan) => kelurahan.name === field.value,
                      )?.name
                    : kelurahan === undefined
                      ? isLoading()
                      : "Pilih Kelurahan"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              id="provinsi-combobox"
              className="z-[150] max-h-80 w-full overflow-y-scroll p-0"
            >
              <Command>
                <CommandInput placeholder="Cari Kelurahan..." className="h-9" />
                <CommandEmpty>Kelurahan/Desa tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {kelurahan &&
                    kelurahan.map((kelurahan) => (
                      <CommandItem
                        value={kelurahan.name}
                        key={kelurahan.name}
                        onSelect={() => {
                          form.setValue("kelurahan_desa", kelurahan.name);
                          onChoosingLocation(kelurahan.id, "kelurahanId");
                          setOpen(false);
                        }}
                      >
                        {kelurahan.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            kelurahan.name === field.value
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

export default KelurahanField;

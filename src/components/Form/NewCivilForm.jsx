"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";
import ProvinsiField from "./ProvinsiField";
import KotaField from "./KotaField";

const MAX_KTP_SIZE = 2097152;
const ALLOWED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/bmp",
];

const formSchema = z.object({
  nama: z
    .string()
    .min(2, { message: "Minimal nama memiliki 2 karakter" })
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Nama hanya boleh berisi huruf",
    }),
  umur: z
    .string()
    .regex(/^[0-9]/)
    .refine((value) => parseInt(value) >= 25, {
      message: "Minimal umur 25 tahun",
    }),
  nik: z.string().regex(/^[0-9]/),
  nkk: z.string().regex(/^[0-9]/),
  foto_ktp: z
    .custom((val) => val instanceof FileList, "Required")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_KTP_SIZE),
      `Ukuran maksimal file adalah 2MB.`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      "Format foto harus berformat antara .jpg, .jpeg, .png dan .bmp",
    ),
  foto_kk: z
    .custom((val) => val instanceof FileList, "Required")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_KTP_SIZE),
      `Ukuran maksimal file adalah 2MB.`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      "Format foto harus berformat antara .jpg, .jpeg, .png dan .bmp",
    ),
  gender: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Required.",
  }),
  provinsi: z.string({
    required_error: "Pilih provinsi.",
  }),
  kab_kota: z.string({
    required_error: "Pilih kabupaten/kota.",
  }),
});

const NewCivilForm = () => {
  const [locationId, setLocationId] = useState({
    provinsiId: undefined,
    kotaId: undefined,
  });
  const [provinsi, setProvinsi] = useState();
  const [kota, setKota] = useState();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "" },
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  const onChoosingLocation = (value, key) => {
    setLocationId({ ...locationId, [key]: value });
  };

  useEffect(() => {
    if (!provinsi) {
      const getProvinsi = async () => {
        try {
          const response = await fetch("/api/provinsi");
          const provinsiData = await response.json();
          console.log(provinsiData);
          setProvinsi(provinsiData);
        } catch (error) {
          console.error(error);
        }
      };
      getProvinsi();
    }
  }, [provinsi]);

  useEffect(() => {
    if (locationId.provinsiId) {
      const getKota = async () => {
        try {
          const response = await fetch(
            `/api/kota?provinsiId=${locationId.provinsiId}`,
          );
          const getDataKota = await response.json();
          console.log(getDataKota);
          setKota(getDataKota);
        } catch (error) {
          console.error(error);
        }
      };
      getKota();
    }
  }, [locationId.provinsiId, locationId]);

  console.log(locationId);

  if (!provinsi) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div>
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className=" space-y-2">
                  <FormLabel>
                    Nama<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="umur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Umur<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Umur"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-", ".", ","].includes(e.key) &&
                        e.preventDefault()
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    NIK<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nomor Induk Keluarga"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-", ".", ","].includes(e.key) &&
                        e.preventDefault()
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nkk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    NKK<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nomor Kartu Keluarga"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-", ".", ","].includes(e.key) &&
                        e.preventDefault()
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto_ktp"
              render={({ field: { onChange }, ...field }) => (
                <FormItem>
                  <FormLabel>
                    Foto KTP<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      accept="image/*"
                      type="file"
                      {...field}
                      onChange={(event) => {
                        onChange(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto_kk"
              render={({ field: { onChange }, ...field }) => (
                <FormItem>
                  <FormLabel>
                    Foto KK<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      accept="image/*"
                      type="file"
                      {...field}
                      onChange={(event) => {
                        onChange(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center justify-center "
                    >
                      <FormItem className="flex items-center space-x-1 ">
                        <FormControl>
                          <RadioGroupItem
                            className="self-end"
                            value="Laki-laki"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Laki-laki</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 ">
                        <FormControl>
                          <RadioGroupItem
                            className="self-end"
                            value="Perempuan"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Perempuan</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProvinsiField
              form={form}
              provinsi={provinsi}
              onChoosingLocation={onChoosingLocation}
              setKota={setKota}
            />
            <KotaField
              form={form}
              kota={kota}
              onChoosingLocation={onChoosingLocation}
            />
            {/* <FormField
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
                            ? kota.find((kota) => kota.name === field.value)
                                ?.name
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
                        <CommandInput
                          placeholder="Cari Kota..."
                          className="h-9"
                        />
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
            /> */}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewCivilForm;

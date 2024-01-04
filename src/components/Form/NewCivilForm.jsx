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
import KecamatanField from "./KecamatanField";
import KelurahanField from "./KelurahanField";

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
  kecamatan: z.string({
    required_error: "Pilih kecamatan.",
  }),
  kelurahan_desa: z.string({
    required_error: "Pilih kecamatan.",
  }),
  rt: z
    .string()
    .regex(/^[0-9]/)
    .refine((value) => parseInt(value) > 0, {
      message: "Tidak boleh 0",
    }),
  rw: z
    .string()
    .regex(/^[0-9]/)
    .refine((value) => parseInt(value) > 0, {
      message: "Tidak boleh 0",
    }),
});

const NewCivilForm = () => {
  const [locationId, setLocationId] = useState({
    provinsiId: undefined,
    kotaId: undefined,
    kecamatanId: undefined,
    kelurahanId: undefined,
  });
  const [provinsi, setProvinsi] = useState();
  const [kota, setKota] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [kelurahan, setKelurahan] = useState();
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
          setKota(getDataKota);
        } catch (error) {
          console.error(error);
        }
      };
      getKota();
    }
  }, [locationId.provinsiId]);

  useEffect(() => {
    if (locationId.kotaId) {
      const getKecamatan = async () => {
        try {
          const response = await fetch(
            `/api/kecamatan?kotaId=${locationId.kotaId}`,
          );
          const getDataKecamatan = await response.json();
          setKecamatan(getDataKecamatan);
        } catch (error) {
          console.error(error);
        }
      };
      getKecamatan();
    }
  }, [locationId.kotaId]);

  useEffect(() => {
    if (locationId.kecamatanId) {
      const getKelurahan = async () => {
        try {
          const response = await fetch(
            `/api/kelurahan?kecamatanId=${locationId.kecamatanId}`,
          );
          const getDataKelurahan = await response.json();
          setKelurahan(getDataKelurahan);
        } catch (error) {
          console.error(error);
        }
      };
      getKelurahan();
    }
  }, [locationId.kecamatanId]);

  console.log(locationId);

  if (!provinsi) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
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
          <div className="flex-1">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
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
            <div>
              <ProvinsiField
                form={form}
                provinsi={provinsi}
                onChoosingLocation={onChoosingLocation}
                setKota={setKota}
                setKecamatan={setKecamatan}
                setKelurahan={setKelurahan}
              />
              <KotaField
                form={form}
                kota={kota}
                onChoosingLocation={onChoosingLocation}
                setKecamatan={setKecamatan}
                setKelurahan={setKelurahan}
              />
              <KecamatanField
                form={form}
                kecamatan={kecamatan}
                onChoosingLocation={onChoosingLocation}
                setKelurahan={setKelurahan}
              />
              <KelurahanField
                form={form}
                kelurahan={kelurahan}
                onChoosingLocation={onChoosingLocation}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="rt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        RT<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="RT"
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
                  name="rw"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        RW<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="RW"
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
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewCivilForm;

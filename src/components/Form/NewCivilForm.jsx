"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";

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
import { Textarea } from "../ui/textarea";

import AlasanBantuan from "./AlasanBantuan";
import { Checkbox } from "../ui/checkbox";
import { convertDateToMilis } from "@/lib/utils";
import { services } from "@/lib/services";

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
    required_error: "Pilih kelurahan.",
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
  gaji_sebelum: z
    .string()
    .regex(/^[0-9]/)
    .refine((value) => parseInt(value) > 0, {
      message: "Tidak boleh 0",
    }),
  gaji_sesudah: z
    .string()
    .regex(/^[0-9]/)
    .refine((value) => parseInt(value) > 0, {
      message: "Tidak boleh 0",
    }),
  alamat: z.string().max(255, {
    message: "Panjang karakter alamat maksimal 255.",
  }),
  alasan: z
    .string({
      required_error: "Pilih alasan.",
    })
    .refine((value) => value.length > 0, { message: "Isi terlebih dahulu" }),
  confirm: z.boolean().refine((value) => value === true, {
    message: "Harus dipersetujui terlebih dahulu.",
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
    const date = new Date();

    console.log(value);
    const payload = {
      nama: value.nama,
      nik: parseInt(value.nik),
      nkk: parseInt(value.nkk),
      foto_ktp: "",
      foto_kk: "",
      umur: parseInt(value.umur),
      kelamin: value.gender,
      provinsi: value.provinsi,
      kab_kota: value.kab_kota,
      kecamatan: value.kecamatan,
      kelurahan_desa: value.kelurahan_desa,
      alamat: value.alamat,
      rt: parseInt(value.rt),
      rw: parseInt(value.rw),
      gaji_sebelum: parseInt(value.gaji_sebelum),
      gaji_sesudah: parseInt(value.gaji_sesudah),
      alasan: value.alasan,
      dibuat: convertDateToMilis(String(date)),
    };

    const postCivil = async () => {
      try {
        const response = await services.postCivilData(payload);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    postCivil();

    console.log(payload);
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
  console.log(form.getValues("alasan"));

  console.log(locationId);

  if (!provinsi) {
    return <ReloadIcon className="m-5 h-10 w-10 animate-spin" />;
  }

  return (
    <Form {...form}>
      <form
        id="civil-form"
        className="max-h-[80dvh] overflow-y-scroll p-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mb-3 text-center text-xl font-bold">Data Bansos</h1>
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex-1 shrink-0">
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
          <div className="flex-1 shrink-0">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender<span className="text-red-500">*</span>
                  </FormLabel>
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
          </div>
          <div className="flex-1 shrink-0">
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Alamat<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alamat Lengkap"
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gaji_sesudah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gaji Sesudah<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Gaji Sesudah Pandemi"
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
              name="gaji_sebelum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gaji Sebelum<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Gaji Sebelum Pandemi"
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
            <AlasanBantuan form={form} />
            {/* <div className="space-y-3">
              <FormField
                control={form.control}
                name="alasan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan</FormLabel>
                    <Select
                      onValueChange={(v) => {
                        console.log(v);
                        field.onChange(v);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Alasan membutuhkan bantuan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[150]">
                        <SelectItem value="Kehilangan pekerjaan">
                          Kehilangan pekerjaan
                        </SelectItem>
                        <SelectItem value="Kepala keluarga terdampak atau korban Covid-19">
                          Kepala keluarga terdampak atau korban Covid-19
                        </SelectItem>
                        <SelectItem value="Tergolong fakir/miskin semenjak sebelum Covid-19">
                          Tergolong fakir/miskin semenjak sebelum Covid-19
                        </SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input
                disabled={form.getValues("alasan") === "lainnya"}
                className="self-end"
                type="text"
              />
            </div> */}
          </div>
        </div>
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <div>
                  <div className="mt-3 flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          console.log(checked);
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-xs font-normal">
                      Saya menyatakan bahwa data yang diisikan adalah benar dan
                      siap mempertanggungjawabkan apabila ditemukan
                      ketidaksesuaian dalam data tersebut.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />
        <div className="mt-10 flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewCivilForm;

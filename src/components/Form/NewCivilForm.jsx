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

const MAX_KTP_SIZE = 2097152; // 5 MB
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
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const NewCivilForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "" },
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div>
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
          <div>a</div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewCivilForm;

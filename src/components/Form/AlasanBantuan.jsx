import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const AlasanBantuan = ({ form }) => {
  const [lainnya, setLainnya] = useState(true);

  return (
    <div className="space-y-3">
      <FormField
        control={form.control}
        name="alasan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Alasan<span className="text-red-500">*</span>
            </FormLabel>
            <Select
              onValueChange={(v) => {
                field.onChange(v);
                if (v === "Lainnya") {
                  setLainnya(false);
                } else {
                  setLainnya(true);
                }
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
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
            <Input
              onChange={(e) => {
                field.onChange(e);
              }}
              value={!lainnya ? form.getValues("alasan") : ""}
              disabled={lainnya}
              className="self-end disabled:bg-primary/20"
              type="text"
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AlasanBantuan;

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortBy = ({ onChangeFilterManagement }) => {
  return (
    <Select
      defaultValue="dibuat"
      onValueChange={(v) => onChangeFilterManagement(v, "sort")}
    >
      <SelectTrigger className="w-[180px] max-md:w-[100px] max-md:text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="dibuat">Dibuat</SelectItem>
          <SelectItem value="nama">Nama</SelectItem>
          <SelectItem value="umur">Umur</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;

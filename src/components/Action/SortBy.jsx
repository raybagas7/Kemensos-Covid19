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

const SortBy = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue="asc" placeholder="Select the sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Order</SelectLabel>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;

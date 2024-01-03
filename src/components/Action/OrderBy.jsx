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

const OrderBy = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]"> 
        <SelectValue defaultValue="asc" placeholder="Select the order" />
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

export default OrderBy;

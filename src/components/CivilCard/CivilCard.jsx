import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CivilCard = ({
  nama,
  nik,
  foto_ktp,
  umur,
  gender,
  provinsi,
  kab_kota,
}) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg border-[1px] border-border shadow transition duration-150 hover:shadow-md">
      <div className="flex justify-between gap-2 bg-primary px-3 py-1 text-primary-foreground">
        <p>NIK</p>
        <p>{nik}</p>
      </div>
      <div className="flex gap-3 p-3">
        <div className="flex-1">
          <Avatar className="h-full w-full rounded-lg border-[1px] border-border">
            <AvatarImage
              className=" object-cover"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-[2] text-sm">
          <p>{nama}</p>
          <p>{foto_ktp}</p>
          <p>
            {umur} <span>Tahun</span>
          </p>
          <p>{gender}</p>
          <p>{provinsi}</p>
          <p>{kab_kota}</p>
        </div>
      </div>
    </div>
  );
};

export default CivilCard;

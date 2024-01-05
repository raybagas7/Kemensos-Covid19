import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const CivilCard = ({ nama, nik, umur, kelamin, provinsi, kab_kota }) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [...nama.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();

  return (
    <Link href={`/civil/${nik}`}>
      <div className="cursor-pointer overflow-hidden rounded-lg border-[1px] border-border shadow transition duration-150 hover:shadow-md">
        <div className="flex justify-between gap-2 bg-primary px-3 py-1 text-primary-foreground">
          <p>NIK</p>
          <p>{nik}</p>
        </div>
        <div className="flex gap-3 p-3 ">
          <div className="flex-1">
            <Avatar className="h-full w-full rounded-lg border-[1px] border-border">
              <AvatarImage
                className=" object-cover"
                src={`https://dummyimage.com/360x360/FFCC29/ffffff.jpg&text=${initials}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-[2] flex-col justify-between text-sm max-md:text-xs">
            <p className="line-clamp-1">{nama}</p>
            <p className="line-clamp-1">
              {umur} <span>Tahun</span>
            </p>
            <p className="line-clamp-1">{kelamin}</p>
            <p className="line-clamp-1">{provinsi}</p>
            <p className="line-clamp-1">{kab_kota}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CivilCard;

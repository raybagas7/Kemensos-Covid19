import React from "react";

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
    <div className="overflow-hidden rounded-lg border-[1px] border-border shadow">
      <div className="flex justify-between gap-2 bg-primary px-3 py-1 text-primary-foreground">
        <p>NIK</p>
        <p>{nik}</p>
      </div>
      <div className="flex px-3 py-1">
        <div className="flex-1">a</div>
        <div className="flex-[2]">
          <p>{nama}</p>
          <p>{foto_ktp}</p>
          <p>{umur}</p>
          <p>{gender}</p>
          <p>{provinsi}</p>
          <p>{kab_kota}</p>
        </div>
      </div>
    </div>
  );
};

export default CivilCard;

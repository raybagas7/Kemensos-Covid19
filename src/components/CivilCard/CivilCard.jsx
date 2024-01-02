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
    <div className="rounded-lg border-[1px] border-border p-3 shadow">
      <p>{nama}</p>
      <p>{foto_ktp}</p>
      <p>{umur}</p>
      <p>{gender}</p>
      <p>{provinsi}</p>
      <p>{kab_kota}</p>
      <p>{nik}</p>
    </div>
  );
};

export default CivilCard;

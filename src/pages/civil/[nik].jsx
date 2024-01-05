import CoreLayout from "@/components/Layout/CoreLayout";
import Modal from "@/components/Modal/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const Civil = ({ dataSipil }) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [...dataSipil.nama.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();

  return (
    <main className="min-h-[100dvh] px-3 pt-20 md:px-28">
      <Modal backDropClose />
      <h1 className="text-center text-2xl font-bold">Data Sipil</h1>
      <div className="mt-5">
        <div className="flex gap-3">
          <Avatar className="h-64 w-64 rounded-lg border-[1px] border-border">
            <AvatarImage
              className=" object-cover"
              src={`https://dummyimage.com/360x360/FFCC29/ffffff.jpg&text=${initials}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex ">
            <div className="flex gap-3">
              <div className="flex flex-col justify-between font-bold">
                <p>Nama</p>
                <p>Gender</p>
                <p>Umur</p>
                <p>Provinsi</p>
                <p>Kabupaten/Kota</p>
                <p>Kecamatan</p>
                <p>Kelurahan/Desa</p>
                <p>RT/RW</p>
              </div>
              <div className="flex flex-col justify-between">
                <p>{dataSipil.nama}</p>
                <p>{dataSipil.kelamin}</p>
                <p>{dataSipil.umur} Tahun</p>
                <p>{dataSipil.provinsi}</p>
                <p>{dataSipil.kab_kota}</p>
                <p>{dataSipil.kecamatan}</p>
                <p>{dataSipil.kelurahan_desa}</p>
                <p>
                  {dataSipil.rt}/{dataSipil.rw}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full">
          <div className="flex-1">a</div>
          <div className="flex-1">s</div>
        </div>
      </div>
    </main>
  );
};

Civil.getLayout = function getLayout(page) {
  return <CoreLayout>{page}</CoreLayout>;
};

export default Civil;

export const getServerSideProps = async ({ params }) => {
  console.log(params);

  const response = await fetch(
    `${process.env.BASE_API_URL}/civils?nik=${params.nik}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const dataSipil = await response.json();

  if (!params || !params.nik || dataSipil.length === 0) {
    return {
      notFound: true,
    };
  }

  console.log(dataSipil);

  return {
    props: {
      dataSipil: dataSipil[0],
    },
  };
};

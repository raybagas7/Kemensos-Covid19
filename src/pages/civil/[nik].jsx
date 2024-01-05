import LabeledContainer from "@/components/Container/LabeledContainer";
import CoreLayout from "@/components/Layout/CoreLayout";
import Modal from "@/components/Modal/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatIDR } from "@/lib/utils";
import { useModal } from "@/store/modal";
import Image from "next/image";

import React from "react";

const Civil = ({ dataSipil }) => {
  const { showModal } = useModal();

  const showBiggerImage = (url) => {
    showModal(
      <div className="relative rounded-lg bg-background p-1">
        <Image
          className="max-h-[500px] rounded-lg border object-contain"
          src={url}
          alt="selected-project-picture"
          width={1020}
          height={720}
        />
      </div>,
    );
  };

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
        <div className="flex gap-3 max-md:flex-col max-md:items-center">
          <Avatar className="h-64 w-64 rounded-lg border-[1px] border-border max-md:h-40 max-md:w-40">
            <AvatarImage
              className=" object-cover"
              src={`https://dummyimage.com/360x360/FFCC29/ffffff.jpg&text=${initials}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex max-md:justify-center max-md:text-sm">
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
        <div className="mb-5 mt-5 flex w-full gap-5 max-md:flex-col max-md:text-sm">
          <div className="flex-1 space-y-5">
            <LabeledContainer label="Alamat Lengkap">
              <p>{dataSipil.alamat}</p>
            </LabeledContainer>
            <LabeledContainer className="flex" label="Pendapatan">
              <div className="flex-1 ">
                <p className="font-bold">Gaji Sebelum Pandemi</p>
                <p
                  className={`${
                    parseInt(dataSipil.gaji_sebelum) <
                    parseInt(dataSipil.gaji_sesudah)
                      ? "text-red-500"
                      : "text-green-500"
                  } font-medium`}
                >
                  {formatIDR(dataSipil.gaji_sebelum)}
                </p>
              </div>
              <div className="flex-1">
                <p className="font-bold">Gaji Sesudah Pandemi</p>
                <p
                  className={`${
                    parseInt(dataSipil.gaji_sebelum) >
                    parseInt(dataSipil.gaji_sesudah)
                      ? "text-red-500"
                      : "text-green-500"
                  } font-medium`}
                >
                  {formatIDR(dataSipil.gaji_sesudah)}
                </p>
              </div>
            </LabeledContainer>
            <LabeledContainer label="Alasan">
              <p>{dataSipil.alasan}</p>
            </LabeledContainer>
          </div>
          <div className="flex-[1.5]">
            <LabeledContainer label="Data Dokumen">
              <div className="mb-5 flex gap-3 ">
                <div className="flex flex-col justify-between font-bold">
                  <p className=" line-clamp-1">Nomor Induk Kependudukan</p>
                  <p className=" line-clamp-1">Nomor Kartu Keluarga</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p>{dataSipil.nik}</p>
                  <p>{dataSipil.nkk}</p>
                </div>
              </div>
              <LabeledContainer
                className="flex w-fit gap-3 max-md:w-full max-md:flex-col"
                label={"Foto Dokumen"}
              >
                <Image
                  onClick={() => showBiggerImage(dataSipil.foto_ktp)}
                  alt="ktp-sipil"
                  src={dataSipil.foto_ktp}
                  className="h-auto min-w-40 cursor-pointer rounded-lg border-[1px] border-border hover:border-primary max-md:self-center"
                  width={500}
                  height={500}
                />
                <Image
                  onClick={() => showBiggerImage(dataSipil.foto_kk)}
                  alt="ktp-sipil"
                  src={dataSipil.foto_kk}
                  className="h-auto min-w-40 cursor-pointer rounded-lg border-[1px] border-border hover:border-primary max-md:self-center"
                  width={500}
                  height={500}
                />
              </LabeledContainer>
            </LabeledContainer>
          </div>
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
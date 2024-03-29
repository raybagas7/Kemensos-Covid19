import ActionContainer from "@/components/Action/ActionContainer";
import CivilCard from "@/components/CivilCard/CivilCard";
import CoreLayout from "@/components/Layout/CoreLayout";
import Modal from "@/components/Modal/Modal";
import { services } from "@/lib/services";
import { useEffect, useState } from "react";
import Head from "next/head";
import { toast } from "sonner";

export default function Home() {
  const [civilsData, setCivilsData] = useState();
  const [initialize, setInitialize] = useState(true);
  const [filterManagement, setFilterManagement] = useState({
    sort: "dibuat",
    order: "asc",
  });

  const onChangeFilterManagement = (value, key) => {
    setFilterManagement({ ...filterManagement, [key]: value });
  };

  useEffect(() => {
    const getCivils = async () => {
      try {
        const response = await services.getCivilsData(
          filterManagement.sort,
          filterManagement.order,
        );
        setCivilsData(response.data);
        setInitialize(false);
      } catch (error) {
        toast("Gagal mendapatkan data civil", {
          type: "error",
          style: { backgroundColor: "#FF0000", color: "#FFFFFF" },
        });
      }
    };

    getCivils();
  }, [filterManagement]);

  return (
    <>
      <Head>
        <title>Kemensos Bantuan Sosial Covid-19</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-[100dvh] px-3 pt-20 md:px-28">
        <Modal backDropClose />
        <div>
          <ActionContainer
            onChangeFilterManagement={onChangeFilterManagement}
          />
          {initialize ? null : (
            <div className="mt-5 grid grid-cols-civil-card gap-3  max-md:grid-cols-mobile-civil-card ">
              {civilsData.map((civil) => (
                <CivilCard key={civil.id} {...civil} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <CoreLayout>{page}</CoreLayout>;
};

import ActionContainer from "@/components/Action/ActionContainer";
import CivilCard from "@/components/CivilCard/CivilCard";
import CoreLayout from "@/components/Layout/CoreLayout";
import Modal from "@/components/Modal/Modal";
import { services } from "@/lib/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [civilsData, setCivilsData] = useState();
  const [initialize, setInitialize] = useState(true);

  useEffect(() => {
    const getCivils = async () => {
      try {
        const response = await services.getCivilsData();
        setCivilsData(response.data);
        setInitialize(false);
      } catch (error) {
        console.error(error);
      }
    };

    getCivils();
  }, []);

  return (
    <main className={`min-h-[100dvh]`}>
      <Modal backDropClose />
      <div className="pt-20">
        <p>KEMENSOS cov-19</p>
        <ActionContainer />
        {initialize ? null : (
          <div className="grid-cols-civil-card max-md:grid-cols-mobile-civil-card mt-5 grid gap-3">
            {civilsData.map((civil) => (
              <CivilCard key={civil.id} {...civil} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return <CoreLayout>{page}</CoreLayout>;
};

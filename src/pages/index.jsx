import ActionContainer from "@/components/Action/ActionContainer";
import CivilCard from "@/components/CivilCard/CivilCard";
import CoreLayout from "@/components/Layout/CoreLayout";
import Modal from "@/components/Modal/Modal";
import { services } from "@/lib/services";
import { useEffect, useState } from "react";

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

  console.log(filterManagement);

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
        console.error(error);
      }
    };

    getCivils();
  }, [filterManagement]);

  return (
    <main className={`min-h-[100dvh]`}>
      <Modal backDropClose />
      <div className="pt-20">
        <p>KEMENSOS cov-19</p>
        <ActionContainer onChangeFilterManagement={onChangeFilterManagement} />
        {initialize ? null : (
          <div className="mt-5 grid grid-cols-civil-card gap-3 max-md:grid-cols-mobile-civil-card">
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

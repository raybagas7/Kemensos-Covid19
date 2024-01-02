import ActionContainer from "@/components/Action/ActionContainer";
import CoreLayout from "@/components/Layout/CoreLayout";
import Modal from "@/components/Modal/Modal";

export default function Home() {
  return (
    <main className={`min-h-[100dvh]`}>
      <Modal backDropClose />
      <div className="pt-16">
        <p>KEMENSOS cov-19</p>
      </div>
      <ActionContainer />
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return <CoreLayout>{page}</CoreLayout>;
};

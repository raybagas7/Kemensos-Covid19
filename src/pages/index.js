import CoreLayout from "@/components/Layout/CoreLayout";

export default function Home() {
  return (
    <main className={`min-h-[100dvh]`}>
      <div>
        <p>KEMENSOS</p>
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return <CoreLayout>{page}</CoreLayout>;
};

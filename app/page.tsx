// import Image from "next/image";

import Capsules from "@/components/Capsules";

export default function Home() {
  return (
    <>
      <div className="bg-herobg bg-brand_primary-50 bg-cover bg-no-repeat bg-top">
        <header className="contain text-white text-center flex flex-col justify-center py-80">
          <h1 className="text-6xl tracking-normal md:text-[5rem] md:tracking-widest font-bold mb-2 -mt-20">
            SPACEX
          </h1>
          <p className="md:text-xl">Re-imagining space explorations</p>
        </header>
      </div>

      <Capsules />
    </>
  );
}

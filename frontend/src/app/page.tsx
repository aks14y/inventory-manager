import cross from "../assets/cross_cover.svg";
import Image from "next/image";
export default function Home() {
  return (
    <main className="bg-splash_bg h-screen relative">
      <div className="flex flex-row absolute top-1/2 left-48 -translate-y-1/2">
        <h1 className="text-primary text-6xl font-sigmar_One">
          Inventory <br /> Manager
        </h1>
        <Image src={cross} alt="more" className="w-32" />
      </div>

      <div className="absolute bg-primary -top-2 right-0 h-72 w-96 rounded-lg"></div>
    </main>
  );
}

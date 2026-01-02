import Image from "next/image";
import AboutCard from "@/components/AboutCard";
import ProjectSection from "@/components/ProjectSection";
import ContactCard from "@/components/ContactCard";
import { AwardSection } from "@/components/Awards";

export default function Home() {
  return (
    <>
      <div className="mt-20 mb-20 h-full">
        <h1 className=" flex w-full items-center justify-center mb-4 mt-4 font-bold text-4xl">Hi, I'm Harshal Chavan</h1>
        <h3 className="flex w-full items-center justify-center ">Code. Create. Connect.</h3>
      </div>
    <section id="about" className="py-16 bg-ctp-crust rounded-lg shadow-lg my-12 fade-in-section is-visible">
    <AboutCard/>
    </section>
    <ProjectSection/>
    <AwardSection/>
    <ContactCard />
    </>
  );
}

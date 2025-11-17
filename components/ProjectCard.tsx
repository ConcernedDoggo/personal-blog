import Image from "next/image"
import Link from "next/link"
import { GoLinkExternal } from "react-icons/go";
import { LuGithub } from "react-icons/lu";



const Projects = [
    {
        _id: 1,
        img: '/SignMeUp.png',
        title: "SignMeUp",
        description: "A  web application built with HTML, Tailwind CSS, and JavaScript, enabling sign language learning through accurate hand detection and a user-friendly interface",
        liveLink: "https://signmeup.harshalchavan.com/",
        githubLink: "https://github.com/harshal24-chavan/SignUI"
    },
    {
        _id: 2,
        img: '/SpaceCraft.png',
        title: "SpaceCraft",
        description: "Blast off with Cosmic Combat! A retro-inspired 2D side-scrolling shooter built with JavaScript, HTML Canvas, and CSS. Pilot your spaceship, engage alien enemies, and rack up points in classic arcade action!",
        liveLink: "https://spacecraft.harshalchavan.com/",
        githubLink: "https://github.com/harshal24-chavan/spacecraft"
    },
    {
        _id: 3,
        img: '/PrimeEstate.png',
        title: "PrimeEstate",
        description: "Built with the MERN stack, PrimeEstate offers a seamless experience for managing and discovering properties. Enjoy intuitive browsing, detailed listings with images, and powerful search capabilities, all within a secure environment.",
        liveLink: "https://spacecraft.harshalchavan.com/",
        githubLink: "https://github.com/harshal24-chavan/SignUI"
    }
]
export default function ProjectCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Projects.map(project => (
                <div key={project._id} className="bg-ctp-mantle rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                    <Image src={project.img} alt="project img" width={200} height={200} className="w-full h-48 object-cover" />
                    <div className="text-ctp-text p-2">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="">{project.description}</p>
                        <div className="flex gap-6 mt-4">
                            <Link href={project.liveLink} className="flex gap-2 items-center hover:font-semibold"> Live Demo <GoLinkExternal /> </Link>
                            <Link href={project.githubLink} className="flex gap-2 items-center hover:font-semibold"> Github <LuGithub /> </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
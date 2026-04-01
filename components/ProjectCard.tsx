import Image from "next/image"
import Link from "next/link"
import { GoLinkExternal } from "react-icons/go";
import { LuGithub } from "react-icons/lu";



const Projects = [
    {
        _id: 1,
        img: '/LoadBalancer.jpg',
        title: "Multithreaded C++ Loadbalancer",
        description: "🚀 High-performance C++ L7 Load Balancer. Features multi-threading, async health checks, zero-downtime hot-reloading (EFSW), and thread-safe observability. Built with Strategy & Singleton patterns. Libraries: Crow, Cpr, EFSW, toml++.",
        liveLink: "",
        githubLink: "https://github.com/harshal24-chavan/LoadBalancer-CPP"
    },
    {
        _id: 2,
        img: '/spsc.png',
        attribution: '<a href="https://www.flaticon.com/free-icons/process" title="process icons">Process icons created by pojok d - Flaticon</a>',
        title: "Lock Free SPSC Queue",
        description: "A wait-free SPSC (Single-Producer Single-Consumer) lock-free queue. Achieving 225M+ ops/s through cache-line alignment and acquire-release semantics.",
        liveLink: "",
        githubLink: "https://github.com/harshal24-chavan/SPSC-Queue-CPP"
    },
    {
        _id: 3,
        img: '/RateLimiter.png',
        title: "High Performance C++ RateLimiter",
        description: "High-performance C++20 distributed rate limiter using gRPC and Redis. Features a tiered L1/L2 architecture with lock-free SPSC queues and sharded hot-path caching, achieving 180k+ req/s with sub-300ns inter-thread latency.",
        liveLink: "",
        githubLink: "https://github.com/harshal24-chavan/RateLimiter-CPP"
    },
    {
        _id: 4,
        img: '/CryptoInsight.png',
        title: "CryptoInsight",
        description: "A crypto analytics platform. Featuring a React frontend and a Go/Redis backend designed for high-performance data fetching and optimized API consumption.",
        liveLink: "https://crypto-insight1.netlify.app/",
        githubLink: "https://github.com/harshal24-chavan/CryptoInsight"
    },
    {
        _id: 5,
        img: '/SignMeUp.png',
        title: "SignMeUp",
        description: "A  web application built with HTML, Tailwind CSS, and JavaScript, enabling sign language learning through accurate hand detection and a user-friendly interface",
        liveLink: "https://signmeup.harshalchavan.com/",
        githubLink: "https://github.com/harshal24-chavan/SignUI"
    },
    {
        _id: 6,
        img: '/SpaceCraft.png',
        title: "SpaceCraft",
        description: "Blast off with Cosmic Combat! A retro-inspired 2D side-scrolling shooter built with JavaScript, HTML Canvas, and CSS. Pilot your spaceship, engage alien enemies, and rack up points in classic arcade action!",
        liveLink: "https://spacecraft.harshalchavan.com/",
        githubLink: "https://github.com/harshal24-chavan/spacecraft"
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
                            {(project.liveLink != "") ? <Link href={project.liveLink} target="_blank" className="flex gap-2 items-center hover:font-semibold"> Live Demo <GoLinkExternal /> </Link> : <></>}
                            <Link href={project.githubLink} target="_blank" className="flex gap-2 items-center hover:font-semibold"> Github <LuGithub /> </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
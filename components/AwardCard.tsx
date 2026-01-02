import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LuGithub } from 'react-icons/lu'
import { GoLinkExternal } from 'react-icons/go'

const Awards = [
    {
        _id: 1,
        img: '/SIH.jpeg',
        title: "Smart India Hackathon Winner",
        description: "Led team of 5 to develop educational Godot game on groundwater conservation.",
        liveLink: "https://spacecraft.harshalchavan.com/",
        githubLink: "https://github.com/harshal24-chavan/waterkeepers"
    }
]

export const AwardCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Awards.map(award => (
                <div key={award._id} className="bg-ctp-mantle rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                    <Image src={award.img} alt="project img" width={200} height={200} className="w-full h-48 object-cover" />
                    <div className="text-ctp-text p-2">
                        <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                        <p className="">{award.description}</p>
                        <div className="flex gap-6 mt-4">
                            {(award.liveLink != "") ? <Link href={award.liveLink} target="_blank" className="flex gap-2 items-center hover:font-semibold"> Live Demo <GoLinkExternal /> </Link> : <></>}
                            <Link href={award.githubLink} target="_blank" className="flex gap-2 items-center hover:font-semibold"> Github <LuGithub /> </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

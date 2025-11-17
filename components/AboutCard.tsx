import React from 'react'
import Image from 'next/image'

export default function AboutCard() {
    return (
        <div className='container mx-auto px-6'>
            <h1 className="text-3xl font-bold text-center mb-8">About Me</h1>
            <div className='flex flex-col md:flex-row items-center md:space-x-12'>
                <div className='md:w-1/3 mb-8 md:mb-0 text-center'>
                    <Image
                        src={"/happy.png"}
                        alt="Picture of the author"
                        width={212}
                        height={212}
                    />
                </div>

                <div className='md:w-2/3  text-lg'>
                    <div className='max-w-[70ch]'>
                        <p className='mb-4'>
                            Hi there! I'm a web developer with a creative eye and a passion for collaboration. I believe in building websites that not only function flawlessly but also leave a lasting impression. Take a look through my portfolio to see how I blend technical expertise with innovative design to create unique online experiences.
                        </p>
                        <p className='mb-4'>
                            I have a background in Software Engineering and I enjoy solving problems and learning new things. My goal is to build user-friendly and efficient digital experiences.
                        </p>
                        <p className='mb-4'>
                            From coding to chess, football, and treks – I build, strategize, collaborate, and explore.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

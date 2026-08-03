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
                        C++ systems Engineer Specializing in ultra-low-latency architectures, lock-free concurrency, and Linux kernel I/O. Linux kernel & Drogon framework contributor. Obsessed with zero-copy data paths, hardware-aware optimizations and sub 200ns execution.
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

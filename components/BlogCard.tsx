
import Link from 'next/link'
import React from 'react'
import { getSortedArticles } from '@/lib/articles';


export default function BlogCard() {
    const Blogs = getSortedArticles();
  console.log(Blogs)
  return (
    <div className='md:grid-cols-2 grid gap-4 justify-center'>
        {Blogs.map(blog => (
            <Link  key={blog.id} href={`/blog/${blog.id}`}>
                <div className='border rounded-lg border-white p-4 m-4 bg-ctp-surface1 text-ctp-base max-w-[90ch] group group-hover:opacity-80 transition duration-1000 ease-in-out'>
                    <div className='text-2xl font-bold transform group-hover:-translate-y-1 transition duration-400 ease-in-out'>{blog.title}</div>
                    <div className=''>{blog.category}</div>
                    <div>{blog.date}</div>

                </div>
            </Link>
        ))}
        </div>
    )
}



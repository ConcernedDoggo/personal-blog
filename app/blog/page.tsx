import React from 'react'
import  BlogCard  from '@/components/BlogCard'
import { getCategorisedArticles } from '@/lib/articles'

export default function Blog() {
  const articles = getCategorisedArticles();

  return (
    <div className='p-4 justify-center'>
        <BlogCard />
    </div>
  )
}

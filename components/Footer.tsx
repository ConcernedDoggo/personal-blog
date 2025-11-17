import React from 'react'
import { FaHeart } from "react-icons/fa";


export const Footer = () => {
  return (
    <div className='flex items-center gap-2 mt-4 mb-4 w-full justify-center'> 
    Made with <FaHeart/> {new Date().getFullYear()}
    </div>
  )
}

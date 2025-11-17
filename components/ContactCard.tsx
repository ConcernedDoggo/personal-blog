import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";


import { IoMdMail } from "react-icons/io";

export default function ContactCard(){
    return (
        <section id="contact" className="py-16 bg-ctp-crust text-gray-200 rounded-lg shadow-lg my-12 fade-in-section is-visible">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                <p className="text-lg mb-6 text-ctp-text">
                    Have a question or want to work together? Feel free to reach out!
                </p>
                <Link href="mailto:harshal24.chavan@gmail.com" className="gap-2 inline-block items-center bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-600 transition duration-300 mb-8"> <IoMdMail className="inline-block text-lg pb-1" /> Send Me an Email </Link>
            </div>
            <div className="flex justify-center text-lg space-x-6 items-center">
                <p className="text-gray-400 ">Connect with me:</p>
                <Link href={"https://github.com/harshal24-chavan/"}><FiGithub/></Link>
                <Link href={"https://linkedin.com/in/harshal24-chavan/"}><FiLinkedin/></Link>
            </div>
        </section>
    )
}
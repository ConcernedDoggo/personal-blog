import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex md:bg-transparent bg-ctp-base gap-6 items-center justify-between p-8 md:p-0 text-ctp-text rounded-lg mb-4 sticky top-2 z-50">
            <Link className="font-bold text-xl md:m-2" href={"/"}>Harshal Chavan</Link>
            <div className="flex gap-6">
                <Link className="underline-hover" href={"/blog"}>Blog</Link>
                <Link className="underline-hover" href={"/#projects"}>Projects</Link>
                <Link className="underline-hover" href={"/#contact"}>Contact</Link>
            </div>
        </nav>
    )
}

export default Navbar
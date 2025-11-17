import ProjectCard from "./ProjectCard";

export default function ProjectSection() {
    return (
        <section id="projects" className="bg-ctp-surface1 p-10  rounded-lg text-ctp-crust">
            <h1 className="text-3xl font-bold text-center mb-12">Projects</h1>
            <ProjectCard />
        </section>
    )
}
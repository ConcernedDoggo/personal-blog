import React from 'react'
import { AwardCard } from './AwardCard'

export const AwardSection = () => {
    return (
        <section id="Awards" className="bg-ctp-crust rounded-lg shadow-lg my-12 fade-in-section is-visible p-10  text-ctp-text">
            <h1 className="text-3xl font-bold text-center mb-12">Awards / Achievements</h1>
            <AwardCard/>
        </section>
    )
}

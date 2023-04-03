import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'

import "./style.scss"
import Trending from './trending/Trending'

const Home = () => {
    return (
        <section className="home">
            <HeroBanner />
            <Trending />
        </section>
    )
}

export default Home

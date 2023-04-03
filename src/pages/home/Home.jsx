import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Popular from './popular/Popular'

import "./style.scss"
import TopRated from './topRated/TopRated'
import Trending from './trending/Trending'

const Home = () => {
    return (
        <section className="home">
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </section>
    )
}

export default Home

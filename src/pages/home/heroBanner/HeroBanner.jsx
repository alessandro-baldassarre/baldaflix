import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadImage/Img'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { selectImagesConfig } from '../../../store/configSlice'

import "./style.scss"

const HeroBanner = ({ setSearchInput }) => {

    const [background, setBackground] = useState("")

    const imagesConfig = useSelector(selectImagesConfig)

    const { data, isLoading, error } = useAxiosFetch("/movie/upcoming")

    useEffect(() => {
        const random = Math.floor(Math.random() * 20)
        const upcomingMoviesBg = data?.results?.[random].backdrop_path
        const baseImageUrl = imagesConfig?.secure_base_url + "original"
        setBackground(baseImageUrl + upcomingMoviesBg)
    }, [data])

    return (
        <section className="hero">
            {!isLoading && data &&
                <div className="hero__bg">
                    <Img src={background} />
                </div>
            }

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="container">
                    <div className="content">
                        <h2 className="title">Welcome</h2>
                        <span className="subtitle">Millions of movies, TV shows and actors to discover. Explore now.</span>
                        <div className="search" >
                            <input type="text" placeholder="Search for a movie or TV show..." onChange={(ev) => setSearchInput(ev.target.value)} />
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    )
}

export default HeroBanner

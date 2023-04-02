import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadImage/Img'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useDebounce from '../../../hooks/useDebounce'
import { selectImagesConfig } from '../../../store/configSlice'

import "./style.scss"

const HeroBanner = () => {
    const navigate = useNavigate()

    const [background, setBackground] = useState("")
    const [searchInput, setSearchInput] = useState("")

    const imagesConfig = useSelector(selectImagesConfig)

    const { data, isLoading, error } = useAxiosFetch("/movie/upcoming")

    const debouncedSearchInput = useDebounce(searchInput, 1000)

    // useEffect(() => {
    //     const filterData = setTimeout(() => {
    //         //get data from api
    //         console.log(searchInput)
    //     }, 2000)
    //
    //     return () => clearTimeout(filterData)
    //
    // }, [searchInput])

    useEffect(() => {
        const random = Math.floor(Math.random() * 20)
        const upcomingMoviesBg = data?.results?.[random].backdrop_path
        const baseImageUrl = imagesConfig.secure_base_url + "original"
        setBackground(baseImageUrl + upcomingMoviesBg)
    }, [data])

    return (
        <section className="hero">
            {!isLoading &&
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

import { useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import HeroBanner from './heroBanner/HeroBanner'
import Popular from './popular/Popular'
import SearchResult from './searchResult/SearchResult'

import "./style.scss"
import TopRated from './topRated/TopRated'
import Trending from './trending/Trending'

const Home = () => {
    const [searchInput, setSearchInput] = useState("")
    const debouncedSearchInput = useDebounce(searchInput, 1000)

    return (
        <section className="home">
            <HeroBanner setSearchInput={setSearchInput} />
            {!debouncedSearchInput.length
                ? (
                    <>
                        <Trending />
                        <Popular />
                        <TopRated />
                    </>
                ) : <SearchResult searchInput={debouncedSearchInput} />
            }

        </section>
    )
}

export default Home

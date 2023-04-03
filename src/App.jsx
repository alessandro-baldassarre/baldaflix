import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import useAxiosFetch from "./hooks/useAxiosFetch"
import NotFound from "./pages/404/NotFound"
import Details from "./pages/details/Details"
import Explore from "./pages/explore/Explore"
import Home from "./pages/home/Home"
import SearchResult from "./pages/searchResult/SearchResult"
import { getApiConfiguration, getGenres } from "./store/configSlice"

function App() {
    const dispatch = useDispatch()
    const { data: config } = useAxiosFetch("/configuration")
    const { data: { genres: movieGenres } } = useAxiosFetch("/genre/movie/list")
    const { data: { genres: tvGenres } } = useAxiosFetch("/genre/tv/list")

    useEffect(() => {
        dispatch(getApiConfiguration(config))

        if (movieGenres && movieGenres.length > 0 && tvGenres && tvGenres.length > 0) {
            dispatch(getGenres([...movieGenres, ...tvGenres]))
        }
    }, [config, movieGenres, tvGenres])

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App

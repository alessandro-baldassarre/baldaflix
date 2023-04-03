import { useState } from "react"
import Carousel from "../../../components/carousel/Carousel"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useAxiosFetch from "../../../hooks/useAxiosFetch"

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const { data, isLoading, error } = useAxiosFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Popular</span>
                <SwitchTabs data={["Movies", "TV Show"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data.results} isLoading={isLoading} error={error} endpoint={endpoint} />
        </div>
    )
}

export default Popular

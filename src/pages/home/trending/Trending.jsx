import { useState } from "react"
import Carousel from "../../../components/carousel/Carousel"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useAxiosFetch from "../../../hooks/useAxiosFetch"
import "./style.scss"

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")
    const { data, isLoading, error } = useAxiosFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data.results} isLoading={isLoading} error={error} />
        </div>
    )
}

export default Trending

import { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import { selectImagesConfig } from "../../store/configSlice";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


const Carousel = ({ data, isLoading, error, endpoint, title }) => {
    const carouselContainer = useRef()
    const navigate = useNavigate()
    const imagesConfig = useSelector(selectImagesConfig)
    const baseImageUrl = imagesConfig?.secure_base_url + "original"

    const navigation = (direction) => {
        const container = carouselContainer.current

        const scrollValue = direction === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({ left: scrollValue, behavior: "smooth" })

    }

    const SkeletonItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")} />
                {!isLoading
                    ? (<div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? baseImageUrl + item.poster_path : PosterFallback
                            return (
                                <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <div className="date">
                                            {dayjs(item.release_date).format("MMMM D, YYYY")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>)
                    : (
                        <div className="loadingSkeleton">
                            {[...Array(5)].map((_, index) => <SkeletonItem key={index} />)}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel

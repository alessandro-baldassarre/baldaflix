import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import Recommendation from './carousels/Recommendation'
import Similar from './carousels/Similar'
import Cast from './cast/Cast'
import DetailsBanner from './detailsBanner/DetailsBanner'

import "./style.scss"
import VideosSection from './videoSection/VideoSection'

const Details = () => {
    const { mediaType, id } = useParams()
    const { data: videos, isLoading: isVideosLoading } = useAxiosFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, isLoading: isCreditsLoading } = useAxiosFetch(`/${mediaType}/${id}/credits`)

    return (
        <div>
            <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits.cast} isLoading={isCreditsLoading} />
            <VideosSection data={videos} isLoading={isVideosLoading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details

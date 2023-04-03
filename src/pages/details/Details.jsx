import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosFetch from '../../hooks/useAxiosFetch'
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
        </div>
    )
}

export default Details

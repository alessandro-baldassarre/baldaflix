import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import Cast from './cast/Cast'
import DetailsBanner from './detailsBanner/DetailsBanner'

import "./style.scss"

const Details = () => {
    const { mediaType, id } = useParams()
    const { data: videos } = useAxiosFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, isLoading: isCreditsLoading } = useAxiosFetch(`/${mediaType}/${id}/credits`)

    return (
        <div>
            <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits.cast} isLoading={isCreditsLoading} />
        </div>
    )
}

export default Details

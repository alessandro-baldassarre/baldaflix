import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { selectImagesConfig } from '../../../store/configSlice'
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { PlayIcon } from "./Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const { mediaType, id } = useParams()
    const { data, isLoading } = useAxiosFetch(`/${mediaType}/${id}`)
    const genresIds = data?.genres?.map((g) => g.id)
    const directors = crew?.filter((member) => member.job === "Director")
    const writers = crew?.filter((member) => member.job === "Story" || member.job === "Writer")
    const imagesConfig = useSelector(selectImagesConfig)
    const baseImageUrl = imagesConfig?.secure_base_url + "original"

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!isLoading ? (
                <>
                    {data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={baseImageUrl + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {
                                            data.poster_path
                                                ? (<Img className="posterImg" src={baseImageUrl + data.poster_path} />)
                                                : (<Img className="posterImg" src={PosterFallback} />)
                                        }

                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={genresIds} />
                                        <div className="row">
                                            <CircleRating rating={data.vote_average?.toFixed(1)} />
                                            <div className="playbtn" onClick={() => { setShow(true); setVideoId(video.key) }}>
                                                <PlayIcon />
                                                <span className="text"> Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">Status:{" "}</span>
                                                    <span className="text">{data.status}</span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">Release:{" "}</span>
                                                    <span className="text">{dayjs(data.release_date).format("MMMM D, YYYY")}</span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">Runtime:{" "}</span>
                                                    <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                </div>
                                            )}

                                        </div>
                                        {directors?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Director:{" "}</span>
                                                <span className="text">
                                                    {
                                                        directors.map((director, index) => (
                                                            <span key={index}>{director.name}{directors.length - 1 !== index && ", "}</span>
                                                        ))

                                                    }
                                                </span>
                                            </div>
                                        )}
                                        {writers?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Writer:{" "}</span>
                                                <span className="text">
                                                    {
                                                        writers.map((writer, index) => (
                                                            <span key={index}>{writer.name}{writers.length - 1 !== index && ", "}</span>
                                                        ))

                                                    }
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Creator:{" "}</span>
                                                <span className="text">
                                                    {
                                                        data?.created_by?.map((creator, index) => (
                                                            <span key={index}>{creator.name}{data?.created_by?.length - 1 !== index && ", "}</span>
                                                        ))

                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )
            }
        </div >
    );
};

export default DetailsBanner;


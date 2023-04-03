import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { useState } from "react";
import { PlayIcon } from "../detailsBanner/Playbtn";

import "./style.scss"

const VideosSection = ({ data, isLoading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const LoadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!isLoading ? (
                    <div className="videos">
                        {data?.results?.map((video) => (
                            <div key={video.id} className="videoItem" onClick={() => { setVideoId(video.key); setShow(true) }}>
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {[Array(4)].map((_, index) => <LoadingSkeleton key={index} />)}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;

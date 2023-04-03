import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { selectImagesConfig } from "../../../store/configSlice";

const Cast = ({ data, isLoading }) => {

    const imagesConfig = useSelector(selectImagesConfig)
    const baseImageUrl = imagesConfig?.secure_base_url + "original"

    const Skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!isLoading && data ? (
                    <div className="listItems">
                        {data.map((member) => {
                            const imageUrl = member.profile_path ? baseImageUrl + member.profile_path : avatar
                            return (
                                <div key={member.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imageUrl} />
                                    </div>
                                    <div className="name">{member.name}</div>
                                    <div className="character">{member.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {[...Array(6)].map((_, index) => (<Skeleton key={index} />))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;

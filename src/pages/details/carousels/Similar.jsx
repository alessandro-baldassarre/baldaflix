import Carousel from "../../../components/carousel/Carousel";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

const Similar = ({ mediaType, id }) => {
    const { data, isLoading, error } = useAxiosFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            isLoading={isLoading}
            endpoint={mediaType}
        />
    );
};

export default Similar;


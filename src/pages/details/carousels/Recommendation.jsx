import Carousel from "../../../components/carousel/Carousel";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, isLoading, error } = useAxiosFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            isLoading={isLoading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;

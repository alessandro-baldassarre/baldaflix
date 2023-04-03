import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import MovieCard from "../../../components/movieCard/MovieCard"
import Spinner from "../../../components/spinner/Spinner"
import "./style.scss"
import { fetchData } from "../../../utils/api"

const SearchResult = ({ searchInput }) => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchInitialData = () => {
        setLoading(true);
        const controller = new AbortController()
        fetchData(controller, `/search/multi?query=${searchInput}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        const controller = new AbortController()
        fetchData(controller, `/search/multi?query=${searchInput}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [searchInput]);


    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data?.total_results > 1
                                    ? "results"
                                    : "result"
                                    } of '${searchInput}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
}

export default SearchResult

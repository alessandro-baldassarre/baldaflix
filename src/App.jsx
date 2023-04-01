import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getApiConfiguration } from "./store/homeSlice"
import { fetchData } from "./utils/api"

function App() {
    const dispatch = useDispatch()

    const url = useSelector((state) => state.home.url)

    async function homeConfig(controller) {

        const movies = await fetchData(controller, "/movie/popular")

        if (movies.results) {
            dispatch(getApiConfiguration(movies))
        }

    }

    useEffect(() => {
        const controller = new AbortController()
        homeConfig(controller)

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div className="App" style={{ color: "white" }}>
            {url?.total_pages}
        </div >
    )
}

export default App

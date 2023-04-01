import { useEffect, useState } from "react"
import { fetchData } from "./utils/api"

function App() {
    const [movies, setMovies] = useState(null)

    async function data(controller) {

        const movies = await fetchData(controller, "/movie/popular")

        setMovies(movies.results)
    }

    useEffect(() => {
        const controller = new AbortController()
        data(controller)

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div className="App">
            {movies
                ? movies.map((movie) => {
                    return (
                        <p key={movie.id} style={{ color: "white" }}>{movie.id}</p>
                    )
                })
                : ""}
        </div >
    )
}

export default App

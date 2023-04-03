import { useSelector } from "react-redux"
import { selectGenres } from "../../store/configSlice"
import "./style.scss"

const Genres = ({ data }) => {
    const genres = useSelector(selectGenres)

    return (
        <div className="genres">
            {
                data?.map((itemGenre) => {
                    const genre = genres.find((item) => item.id === itemGenre)
                    return (
                        genre && <div key={itemGenre} className="genre">
                            {genre?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres

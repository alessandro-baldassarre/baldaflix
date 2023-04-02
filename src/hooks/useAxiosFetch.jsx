import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";


export default function useAxiosFetch(dataUrl) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const fetchAxiosData = async (url) => {
            setIsLoading(true)

            try {
                const response = await fetchData(controller, url)

                if (isMounted) {
                    setData(response)
                    setError(null)
                }

            } catch (err) {
                if (isMounted) {
                    setError(err)
                    setData([])
                }

            } finally {
                setIsLoading(false)

            }
        }

        fetchAxiosData(dataUrl)

        const cleanUp = () => {
            isMounted = false
            // abort api call on unmount
            controller.abort()
        }
        return cleanUp

    }, [dataUrl])

    return { data, isLoading, error }

}

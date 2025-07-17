import { useState, useEffect } from 'react'

export const useFetchData = (fetchFn) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await fetchFn()
            setData(result)
        } catch (error) {
            console.error('Error al cargar datos:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, setData, loading, fetchData }
}
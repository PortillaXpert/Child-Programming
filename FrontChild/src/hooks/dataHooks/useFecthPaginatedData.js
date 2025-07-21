import { useState, useEffect } from 'react'

export const useFetchPaginatedData = (fetchFn, initialPage = 0, size = 4) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(initialPage)
    const [totalPages, setTotalPages] = useState(0)

    const fetchData = async (currentPage = page) => {
        setLoading(true)
        try {
            const result = await fetchFn(currentPage, size)
            setData(result.data)
            setTotalPages(result.totalPages)
        } catch (error) {
            console.error('Error al cargar datos paginados:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page])
    
    return { data, setData, loading, page, setPage, totalPages, fetchData }
}

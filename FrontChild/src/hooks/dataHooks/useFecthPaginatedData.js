import { useState, useEffect, useRef } from 'react'

function areParamsEqual(prevParams, nextParams) {
    if (!prevParams || !nextParams || prevParams.length !== nextParams.length) {
        return false
    }
    return prevParams.every((val, idx) => {
        if (Array.isArray(val) && Array.isArray(nextParams[idx])) {
            return JSON.stringify(val) === JSON.stringify(nextParams[idx])
        }
        return val === nextParams[idx]
    })
}

export const useFetchPaginatedData = (fetchFn, initialPage = 0, size = 4, extraParams = []) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(initialPage)
    const [totalPages, setTotalPages] = useState(0)

    const prevParamsRef = useRef([])

    const fetchData = async (currentPage = page) => {
        setLoading(true)
        try {
            const result = await fetchFn(currentPage, size, ...extraParams)
            setData(result.data)
            setTotalPages(result.totalPages)
        } catch (error) {
            console.error('Error al cargar datos paginados:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!areParamsEqual(prevParamsRef.current, extraParams)) {
            prevParamsRef.current = extraParams
            setPage(0)
            fetchData(0)
        }
    }, [extraParams])

    useEffect(() => {
        fetchData(page)
    }, [page])

    return { data, setData, loading, page, setPage, totalPages, fetchData }
}

import { useState, useMemo } from 'react'

export const useSearchFilter = (items, field) => {
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        return items.filter((item) => item[field]?.toLowerCase().includes(search.toLowerCase()))
    }, [items, search, field])

    return { search, setSearch, filtered }
}

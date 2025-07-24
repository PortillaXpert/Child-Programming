import { useState, useMemo } from 'react'

export const useSearchFilter = (items, fields) => {
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        const lowerSearch = search.toLowerCase()
        return items.filter((item) =>
            fields.some((field) =>
                item[field]?.toLowerCase().includes(lowerSearch)
            )
        )
    }, [items, search, fields])

    return { search, setSearch, filtered }
}

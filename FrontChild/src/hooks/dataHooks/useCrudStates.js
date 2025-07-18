import { useState } from 'react'

export const useCrudStates = () => {
    const [editingId, setEditingId] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    return {
        editingId,
        setEditingId,
        isCreating,
        setIsCreating,
        selectedId,
        setSelectedId,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        itemToDelete,
        setItemToDelete,
    }
}

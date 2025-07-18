
export const useDeleteHandler = (deleteFn, setItems) => {
    const handleDelete = async (itemId) => {
        try {
            await deleteFn(itemId)
            setItems((prev) => prev.map((item) =>
                item.id === itemId ? { ...item, active: false } : item
            ))
        } catch (err) {
            console.error('Error al eliminar:', err)
            alert('Error al eliminar el elemento.')
        }
    }

    return { handleDelete }
}

export const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6'];

export const getColorByIndex = (index) => colors[index % colors.length];

export const statusColors = {
    PENDING: '#FFA726',       
    IN_PROGRESS: '#29B6F6',  
    COMPLETED: '#66BB6A',     
    REVIEWED: '#AB47BC',
    ACTIVE: 'green',
    DESACTIVATE: 'gray',     
};

export const getStatusColor = (status) => statusColors[status] || 'gray'; 

export const statusLabels = {
    PENDING: 'Pendiente',
    IN_PROGRESS: 'En Progreso',
    COMPLETED: 'Completada',
    REVIEWED: 'Revisada',
    ACTIVE: 'Activa',
    DESACTIVATE: 'Inactiva',
};

export const getStatusLabel = (status) => statusLabels[status] || 'Desconocido';

export const statusOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En Progreso' },
    { value: 'COMPLETED', label: 'Completada' },
    { value: 'REVIEWED', label: 'Revisada' },
    { value: 'ACTIVE', label: 'Activa' },
    { value: 'DESACTIVATE', label: 'Inactiva' },
];
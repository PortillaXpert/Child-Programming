import { Pagination } from "@mui/lab"

const sx = {
    mt: 2,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
        color: '#fff',
        backgroundColor: '#1565c0',       
        borderRadius: '8px',
        margin: '0 2px',
        border: '1px solid #fff',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#1976d2',     
        },
    },
    '& .MuiPaginationItem-previousNext': {
        backgroundColor: '#0d47a1',       
        color: '#fff',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    },
    '& .Mui-selected': {
        backgroundColor: '#fff',          
        color: '#1565c0',                 
        fontWeight: 'bold',
        border: '1px solid #1565c0',
        '&:hover': {
            backgroundColor: '#e3f2fd',
        },
    },
}


function CustomPagination({ totalPages, page, setPage }) {
    return (
        <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
            size="small"
            color="primary"
            shape="rounded"
            sx={sx}
        />
    )
}

export default CustomPagination

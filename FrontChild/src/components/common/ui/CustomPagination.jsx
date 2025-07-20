import { Pagination } from "@mui/lab"

const sx = {
    mt: 2,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
        color: '#fff',               
        backgroundColor: '#1976d2', 
    },
    '& .Mui-selected': {
        backgroundColor: '#1976D2', 
        color: 'white',               
    },
}

function CustomPagination({totalPages,page,setPage}) {
    return(
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

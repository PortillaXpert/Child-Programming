import { Stack, Typography } from '@mui/material';


const EntityList = ({ items, renderItem }) => {
    if (!items || items.length === 0) {
        return <Typography sx={{ mt: 2, textAlign: 'center' }}>No hay elementos disponibles.</Typography>;
    }

    return (
        <Stack spacing={2} sx={{ mt: 2 }}>
            {items.map((item, index) => (
                <div key={item.id || index}>
                    {renderItem(item, index)}
                </div>
            ))}
        </Stack>
    );    
};

export default EntityList;

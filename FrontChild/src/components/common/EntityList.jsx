import { Stack, Typography } from '@mui/material';
import EntityCardItem from './EntityCardItem';

const EntityList = ({ items, renderItem }) => {
    if (!items || items.length === 0) {
        return <Typography sx={{ mt: 2, textAlign: 'center' }}>No hay elementos disponibles.</Typography>;
    }

    return (
        <Stack spacing={2} sx={{ mt: 2 }}>
            {items.map((item, index) => renderItem(item, index))}
        </Stack>
    );
};

export default EntityList;

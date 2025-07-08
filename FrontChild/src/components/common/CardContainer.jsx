import { Card, CardContent } from '@mui/material';

function CardContainer({ header, search, list, content }) {
    return (
        <Card
            sx={{
                width: '50vw',
                height: '70vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarColor: '#1976D2 white',
                scrollbarWidth: 'thin',
            }}
        >
            {header}
            <CardContent>
                {search}
                {list}
                {content}
            </CardContent>
        </Card>
    );
}

export default CardContainer;

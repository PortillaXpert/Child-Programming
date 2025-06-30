import { CardContent, Typography, Divider, Box, Card, CardHeader } from '@mui/material'

function MisionComponent() {
  return (
    <Card sx={{ width: '50vw', height: '70vh' }}>
      <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', padding: '50px 10px' }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '30px', ml: '30px' }}>
            <img src="/Iconstars.svg" />
            <Typography sx={{ color: 'white', pl: '5px', fontSize: '20px', fontWeight: '500' }}>MISIÓN</Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography>
          La misión se ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
          laoreet dolore magna Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet La misión se kjsdbvxcm bcx jhasbdcsv lasdifbva aldfuhvalkrn alsdfukvhar vlka alKSDBC
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib
        </Typography>
        <Divider sx={{ margin: '15px 0' }} />
        <Box>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bolder', mb: '10px' }}>OBJETIVOS</Typography>
          <Typography>
            La misión se ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet La misión se kjsdbvxcm bcx jhasbdcsv lasdifbva aldfuhvalkrn alsdfukvhar vlka alKSDBC
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
          </Typography>
        </Box>
        <Divider sx={{ margin: '15px 0' }} />
        <Box>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bolder', mb: '10px' }}>REGLAS</Typography>
          <Typography>
            La misión se ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet La misión se kjsdbvxcm bcx jhasbdcsv lasdif
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
export default MisionComponent

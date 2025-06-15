import { Box } from "@mui/material";

const Center = (props) => {
  const styles = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%'
  }
  return <Box sx={styles} {...props} />;
};

export default Center;

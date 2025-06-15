import {
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/endpoints";

const AccountPopOver = (props) => {
  const { anchorEl, onClose, open } = props;
  const { mutate } = useAuth();

  const handleClick = () => {
    api.signOut();
    mutate();
  };
  return (
    <Popover
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      elevation={3}
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
    >
      <Box sx={{ p: 2 }}>
        <Typography>Cuenta</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Code Gods
        </Typography>
      </Box>
      <Divider />
      <Stack sx={{ p: 1 }}>
        <Button variant="text" onClick={handleClick}>
          Cerrar sesión
        </Button>
      </Stack>
    </Popover>
  );
};

export default AccountPopOver;

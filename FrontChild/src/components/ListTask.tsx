import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DetailTaskList from "./DetailTaskList";

const ListTask = ({ task, onDragStart, mutate }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDragStart = () => {
    onDragStart(task);
  };

  return (
    <>
      <Box
        draggable
        onDragStart={handleDragStart}
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{
          width: "110px",
          height: "140px",
          bgcolor: "#FFE082",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography>{task.name}</Typography>
      </Box>
      <DetailTaskList
        object={task}
        open={open}
        close={handleClose}
        mutate={mutate}
      />
    </>
  );
};

export default ListTask;

import { useState } from "react";
import ListOptions from "../components/others/ListOptions";
import { StarIcon, GroupIcon, DocIcon } from "../components/icon/index";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  Typography,
} from "@mui/material";
import {
  MissionComponent,
  WorkComponent,
} from "../components/homeComponets/index";

interface SelectedState {
  mision: boolean;
  team: boolean;
  task: boolean;
}

type Option = "mision" | "team" | "task";

const HomePage: React.FC = () => {
  const [selected, setSelected] = useState<SelectedState>({
    mision: true,
    team: false,
    task: false,
  });

  const handleChangeSelected = (option: Option): void => {
    setSelected({
      mision: option === "mision",
      team: option === "team",
      task: option === "task",
    });
  };

  return (
    <>
      <div style={{ minHeight: "6rem" }} />
      <div style={{ display: "flex", gap: "20px", marginLeft: "20px" }}>
        <Card sx={{ width: "20vw", height: "70vh" }}>
          <CardHeader
            sx={{ bgcolor: "#1976D2", color: "white", padding: "50px 10px" }}
            title={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  gap: "30px",
                  ml: "30px",
                }}
              >
                <img src="/dashboard.svg" />
                <Typography
                  sx={{
                    color: "white",
                    pl: "5px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Dashboard
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <List>
              <ListOptions
                icon={
                  <StarIcon color={selected.mision ? "#1976D2" : "#64B5F6"} />
                }
                textOption="MISIÓN"
                option="mision"
                changeOption={handleChangeSelected}
                selected={selected.mision}
              />
              <ListOptions
                icon={
                  <GroupIcon color={selected.team ? "#1976D2" : "#64B5F6"} />
                }
                textOption="EQUIPO"
                option="team"
                changeOption={handleChangeSelected}
                selected={selected.team}
              />
              <ListOptions
                icon={<DocIcon color={selected.task ? "#1976D2" : "#64B5F6"} />}
                textOption="TAREAS"
                option="task"
                changeOption={handleChangeSelected}
                selected={selected.task}
              />
            </List>
          </CardContent>
        </Card>
        {selected.mision ? (
          <MissionComponent />
        ) : selected.task ? (
          <WorkComponent />
        ) : selected.team ? (
          <Typography variant="body1">
            Vista de equipo en desarrollo...
          </Typography>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default HomePage;

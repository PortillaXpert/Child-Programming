import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import Aside from "./Aside/Aside.tsx";
import Header from "./Header/Header.tsx";

const Layout = () => {
  const Root = styled("div")(({ theme }) => ({
    display: "grid",
    gap: theme.spacing(1),
    gridTemplateColumns: "auto 1fr",
    height: "100vh",
    width: "100vw",
    paddingLeft: "20px",
    paddingRight: "20px",
    overflow: "hidden",
    backgroundColor: "#E3F2FD",
  }));

  const Main = styled("div")(() => ({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
  }));
  return (
    <Root>
      <Aside />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </Root>
  );
};

export default Layout;

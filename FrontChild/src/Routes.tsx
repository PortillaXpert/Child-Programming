import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/estructure/Layout.tsx";
import { useAuth } from "./hooks/index.ts";
import {
  CreateAccountPage,
  DocumentPage,
  HomePage,
  Login,
  TablePage,
  WorkSpace,
} from "./pages/index.ts";

const privateRoutes = [
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/table", element: <TablePage /> },
      { path: "/workspace", element: <WorkSpace /> },
      { path: "/document", element: <DocumentPage /> },
      { path: "*", element: <Navigate to={"/home"} /> },
    ],
  },
];

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/createAccount", element: <CreateAccountPage /> },
  { path: "*", element: <Navigate to={"/login"} /> },
];

function Routes() {
  const { user } = useAuth();
  const router = createBrowserRouter(user ? privateRoutes : publicRoutes);
  return <RouterProvider router={router} />;
}

export default Routes;

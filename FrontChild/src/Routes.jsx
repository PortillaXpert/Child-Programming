import { Layout } from './components/estructure'
import TablePage from './pages/TablePage'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import WorkSpace from './pages/WorkSpace'
import Login from './pages/Login'
import { useAuth } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import DocumentPage from './pages/DocumentPage'
import CreateAccountPage from './pages/CreateAccountPage'

const privateRoutes = [
  {
    element: <Layout />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/table', element: <TablePage /> },
      { path: '/workspace', element: <WorkSpace /> },
      { path: '/document', element: <DocumentPage /> },
      { path: '*', element: <Navigate to={'/home'} /> }
    ]
  }
]
const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/createAccount', element: <CreateAccountPage /> },
  { path: '*', element: <Navigate to={'/login'} /> }
]
function Routes() {
  const { user } = useAuth()
  const router = createBrowserRouter(user ? privateRoutes : publicRoutes)
  return <RouterProvider router={router} />
}

export default Routes

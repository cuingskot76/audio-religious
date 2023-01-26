import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import BestAudio from "./pages/BestAudio";
import Home from "./pages/Home";
import NewAudio from "./pages/NewAudio";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: [<BestAudio />, <Home />],
      },
    ],
  },
  {
    path: "/create",
    element: <NewAudio />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import NewAudio from "./pages/NewAudio";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
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

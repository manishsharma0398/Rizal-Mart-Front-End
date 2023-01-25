import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import "./App.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<h2>Hello</h2>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;

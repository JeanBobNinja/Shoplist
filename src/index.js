import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Shoplists from './pages/Shoplists';
import Shoplist, {loader as shoplistLoader} from './pages/Shoplist';
import ErrorPage from "./pages/error";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shoplists />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shoplists/:shoplistId",
    element: <Shoplist />,
    loader: shoplistLoader,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
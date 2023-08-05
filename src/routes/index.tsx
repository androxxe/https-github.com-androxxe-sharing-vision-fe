import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import {
  ArticleCreate,
  ArticleEdit,
  ArticleDetail,
  Articles,
} from "../pages/Articles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/articles" replace />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/articles/:id",
    element: <ArticleDetail />,
  },
  {
    path: "/articles/create",
    element: <ArticleCreate />,
  },
  {
    path: "/articles/:id/edit",
    element: <ArticleEdit />,
  },
]);

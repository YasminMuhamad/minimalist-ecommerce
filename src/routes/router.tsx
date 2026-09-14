import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { RoutePlaceholder } from "@/pages/RoutePlaceholder";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

const page = (
  translationKey: Parameters<typeof RoutePlaceholder>[0]["translationKey"],
) => <RoutePlaceholder translationKey={translationKey} />;

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: page("shop") },
      { path: "/shop", element: page("shop") },
      { path: "/category/:categoryId", element: page("category") },
      { path: "/product/:productId", element: page("product") },
      { path: "/cart", element: page("cart") },
      { path: "/checkout", element: page("checkout") },
      { path: "/search", element: page("shop") },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/account", element: page("account") },
          { path: "/orders", element: page("orders") },
          { path: "/orders/:orderId", element: page("order") },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          { path: "/admin", element: page("admin") },
          { path: "/admin/dashboard", element: page("dashboard") },
          { path: "/admin/products", element: page("products") },
          { path: "/admin/categories", element: page("categories") },
          { path: "/admin/coupons", element: page("coupons") },
          { path: "/admin/orders", element: page("orders") },
        ],
      },
    ],
  },
]);

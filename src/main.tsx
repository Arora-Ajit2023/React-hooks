import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ToDo from "./Components/ToDo.tsx";
import ProductList from "./CURD/ProductList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <ToDo /> */}
    <ProductList />
  </StrictMode>
);

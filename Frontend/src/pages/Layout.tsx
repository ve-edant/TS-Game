import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main className="">
        <Outlet /> {/* This will render Home, Products, or FlowerCare pages */}
      </main>
    </div>
  );
};
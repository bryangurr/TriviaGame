import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill container mt-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

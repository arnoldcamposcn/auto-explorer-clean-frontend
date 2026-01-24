import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarsPage } from "../pages/CarsPage";
// import { CarDetailPage } from "../pages/CarDetailPage";
import { HomePage } from "../pages/Home";
import { MainLayout } from "../layouts/MainLayout";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          {/* <Route path="/cars/:id" element={<CarDetailPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


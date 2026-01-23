// presentation/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarsPage } from "../pages/CarsPage";
import { CarDetailPage } from "../pages/CarDetailPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarsPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
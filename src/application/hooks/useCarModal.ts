// application/hooks/useCarModal.ts
import { useState } from "react";
import { Car } from "../../domain/entities/car";

export const useCarModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const openCreateModal = () => {
    setSelectedCar(null);
    setIsOpen(true);
  };

  const openEditModal = (car: Car) => {
    setSelectedCar(car);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCar(null);
  };

  return {
    isOpen,
    selectedCar,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
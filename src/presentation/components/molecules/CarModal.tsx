// presentation/components/molecules/CarModal.tsx
import Modal from "react-modal";
import { ReactNode } from "react";
import { Car, CarFormData } from "../../../domain/entities/car";
import { CarForm } from "../organisms/CarForm";

interface CarModalProps {
 
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  onUpdate: (id: number, payload: Partial<Car>) => Promise<void>;
  children?: ReactNode;
}

export const CarModal = ({
  isOpen,
  onClose,
  selectedCar,
  onUpdate,
  children,
}: CarModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={selectedCar ? "Editar auto" : "Crear nuevo auto"}
      className="bg-white p-6 rounded shadow-lg w-full max-w-md outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          {selectedCar ? "Editar auto" : "Crear nuevo auto"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {selectedCar ? (
        <CarForm
          mode="update"
          initialValues={{
            brand: selectedCar.brand,
            model: selectedCar.model,
            color: selectedCar.color,
            year: selectedCar.year,
          }}
          onSubmit={async (data: CarFormData) => {
            await onUpdate(selectedCar.id, data);
            onClose();
          }}
        />
      ) : (
        children
      )}
    </Modal>
  );
};
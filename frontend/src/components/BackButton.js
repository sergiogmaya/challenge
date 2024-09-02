import React from 'react';
import { useNavigate } from 'react-router-dom';

//Componente para permitir ir atras en la aplicacion
const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navega a la página anterior en el historial
  };

  return (
    <div className="flex justify-end w-full">
      <button
        onClick={handleBackClick}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-3"
      >
        Go Back
      </button>
    </div>
  );
};

export default BackButton;

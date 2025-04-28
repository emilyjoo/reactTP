import React from 'react';
// TODO: Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';


function LoadingSpinner() {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  
  const spinnerClass = theme === 'dark' ? 'text-light' : 'text-primary';

  return (
    <div className="d-flex justify-content-center my-4">
      <div 
        className={`spinner-border ${spinnerClass}`} 
        role="status"
      >
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
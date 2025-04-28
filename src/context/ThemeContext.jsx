import React, { createContext, useContext, useCallback, useMemo } from 'react';
// Exercice 2 - Importer useLocalStorage
import useLocalStorage from '../hooks/useLocalStorage';

// Créer le contexte
const ThemeContext = createContext();

/**
 * Provider pour le contexte de thème
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Enfants du provider
 */
export function ThemeProvider({ children }) {
  // Exercice 3 - Utiliser useLocalStorage pour persister le thème
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  // Exercice 3 - Ajouter la fonction pour basculer entre les thèmes
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  // Valeur fournie par le contexte
  const value = useMemo(() => ({
    // Exercice 3 - Fournir les valeurs et fonctions nécessaires
    theme,
    toggleTheme,
    isDarkMode: theme === 'dark'
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte de thème
 * @returns {Object} Contexte de thème
 */
export function useTheme() {
  // Exercice 3 - Implémenter le hook useTheme
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

export default ThemeContext;
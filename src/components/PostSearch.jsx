import React, { useState, useCallback } from 'react';
// TODO: Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';


function PostSearch({ 
  onSearch, 
  onTagSelect, 
  availableTags = [], 
  selectedTag = '' 
}) {
  const [searchInput, setSearchInput] = useState('');
  
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  
  // TODO: Exercice 3 - Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    onSearch('');
  }, [onSearch]);

  // TODO: Exercice 3 - Appliquer les classes CSS en fonction du thème
  const themeClasses = {
    inputGroup: theme === 'dark' ? 'bg-dark text-light' : '',
    input: theme === 'dark' ? 'bg-secondary text-light' : '',
    tagButton: (tag) => 
      `${tag === selectedTag ? 'active ' : ''}${theme === 'dark' ? 'btn-dark' : 'btn-light'}`
  };

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className={`input-group ${themeClasses.inputGroup}`}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className={`form-control ${themeClasses.input}`}
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {/* TODO: Exercice 1 - Ajouter le bouton pour effacer la recherche */}
            {searchInput && (
              <button 
                className="btn btn-outline-secondary" 
                onClick={handleClearSearch}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
        
        {/* TODO: Exercice 4 - Ajouter le sélecteur de tags */}
        <div className="col-md-4">
          <div className="d-flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                className={`btn btn-sm ${themeClasses.tagButton(tag)}`}
                onClick={() => onTagSelect(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostSearch);
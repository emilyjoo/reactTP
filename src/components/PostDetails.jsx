import React, { useMemo } from 'react';
// TODO: Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';


function PostDetails({ post, onClose, onTagClick }) {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  
  // TODO: Exercice 3 - Utiliser useMemo pour calculer les classes CSS
  const themeClasses = useMemo(() => ({
    card: theme === 'dark' ? 'bg-dark text-light' : '',
    badge: theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark',
    button: theme === 'dark' ? 'btn-dark' : 'btn-light'
  }), [theme]);

  if (!post) return null;
  
  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button 
          className={`btn btn-sm ${themeClasses.button}`}
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div className="card-body">
        {/* TODO: Exercice 4 - Afficher le contenu du post */}
        <p className="card-text">{post.body}</p>
        
        {/* TODO: Exercice 4 - Afficher les réactions et l'utilisateur */}
        <div className="d-flex justify-content-between mt-3">
          <span>
            <i className="bi bi-hand-thumbs-up me-1"></i>
            {post.reactions} réactions
          </span>
          <span>User ID: {post.userId}</span>
        </div>
        
        {/* TODO: Exercice 4 - Afficher les tags */}
        <div className="mt-3">
          <div className="d-flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className={`badge ${themeClasses.badge}`}
                style={{ cursor: 'pointer' }}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostDetails);
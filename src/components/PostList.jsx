import React, { useCallback } from 'react';
// TODO: Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';
// TODO: Exercice 4 - Importer useIntersectionObserver
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';


function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true
}) {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  
  // TODO: Exercice 4 - Utiliser useIntersectionObserver pour le défilement infini
  const [loadMoreRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1
  });

  React.useEffect(() => {
    if (isIntersecting && hasMore && !loading && infiniteScroll) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, infiniteScroll, onLoadMore]);
  
  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = useCallback((post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  }, [onPostClick]);
  
  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  }, [onTagClick]);
  
  // TODO: Exercice 1 - Gérer le cas où il n'y a pas de posts
  if (!loading && posts.length === 0) {
    return (
      <div className="text-center py-5">
        <p>Aucun post trouvé</p>
      </div>
    );
  }
  
  const themeClasses = {
    card: theme === 'dark' ? 'bg-dark text-light' : '',
    tag: theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'
  };

  return (
    <div className="post-list">
      {/* TODO: Exercice 1 - Afficher la liste des posts */}
      <div className="row g-4">
        {posts.map(post => (
          <div key={post.id} className="col-md-6 col-lg-4">
            <div 
              className={`card h-100 ${themeClasses.card}`}
              onClick={() => handlePostClick(post)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}...</p>
                <div className="d-flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className={`badge ${themeClasses.tag}`}
                      onClick={(e) => handleTagClick(e, tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}
      
      {/* TODO: Exercice 4 - Ajouter la référence pour le défilement infini */}
      {infiniteScroll && hasMore && (
        <div ref={loadMoreRef} style={{ height: '20px' }}></div>
      )}
      
      {/* TODO: Exercice 1 - Ajouter le bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && !loading && (
        <div className="text-center mt-4">
          <button 
            className="btn btn-primary"
            onClick={onLoadMore}
          >
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostList);
import React, { useState, useCallback } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
// Exercice 3 - Importer ThemeToggle
import ThemeToggle from './components/ThemeToggle';
// Exercice 3 - Importer ThemeProvider et useTheme
import { ThemeProvider } from './context/ThemeContext';
// Exercice 1 - Importer le hook usePosts
import usePosts from './hooks/usePosts';
// Exercice 2 - Importer le hook useLocalStorage
import useLocalStorage from './hooks/useLocalStorage';
// Exercice 4 - Importer PostDetails
import PostDetails from './components/PostDetails';

function App() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  // Exercice 4 - Ajouter l'état pour le tag sélectionné
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Exercice 1 - Utiliser le hook usePosts pour récupérer les posts
  const { posts, loading, error, total } = usePosts({
    searchTerm,
    tag: selectedTag,
    limit: 10
  });

  // Exercice 2 - Utiliser useLocalStorage pour le mode de défilement
  const [scrollMode, setScrollMode] = useLocalStorage('scrollMode', 'pagination');

  // Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    setSelectedTag('');
  }, []);

  // Exercice 4 - Ajouter le gestionnaire pour la sélection de tag
  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(tag);
    setSearchTerm('');
  }, []);

  const handlePostSelect = useCallback((postId) => {
    setSelectedPostId(postId);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedPostId(null);
  }, []);

  return (
    <ThemeProvider>
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold">Blog</h1>
            {/* Exercice 3 - Ajouter le ThemeToggle */}
            <ThemeToggle />
          </div>
        </header>
        
        <main>
          <PostSearch onSearch={handleSearchChange} />
          
          {/* Exercice 1 - Afficher un message d'erreur si nécessaire */}
          {error && (
            <div className="alert alert-danger">
              Error loading posts: {error}
            </div>
          )}
          
          {/* Exercice 4 - Ajouter le composant PostDetails */}
          {selectedPostId ? (
            <PostDetails 
              postId={selectedPostId} 
              onClose={handleCloseDetails} 
            />
          ) : (
            /* Exercice 1 - Passer les props nécessaires à PostList */
            <PostList 
              posts={posts} 
              loading={loading} 
              onPostSelect={handlePostSelect}
              selectedTag={selectedTag}
              onTagSelect={handleTagSelect}
              total={total}
              scrollMode={scrollMode}
              onScrollModeChange={setScrollMode}
            />
          )}
        </main>
        
        <footer className="pt-3 mt-4 text-center border-top">
          <p>
            TP React Hooks - Blog &middot; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

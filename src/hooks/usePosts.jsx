import { useState, useEffect, useCallback, useMemo } from 'react';
import useDebounce from './useDebounce';

function usePosts({ searchTerm = '', tag = '', limit = 10, infinite = true } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Exercice 2 - Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = useCallback((skip = 0) => {
    let baseUrl = 'https://dummyjson.com/posts';
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) {
      baseUrl = `${baseUrl}/search`;
      params.append('q', debouncedSearchTerm);
    } else if (tag) {
      baseUrl = `${baseUrl}/tag/${tag}`;
    }
    
    params.append('limit', limit);
    params.append('skip', skip);
    
    return `${baseUrl}?${params.toString()}`;
  }, [debouncedSearchTerm, tag, limit]);
  
  // Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const currentSkip = reset ? 0 : skip;
      const url = buildApiUrl(currentSkip);
      const response = await fetch(url);
      const data = await response.json();
      
      setPosts(prev => reset ? data.posts : [...prev, ...data.posts]);
      setTotal(data.total);
      setSkip(currentSkip + limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [buildApiUrl, skip, limit]);
  
  // Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    fetchPosts(true);
  }, [debouncedSearchTerm, tag, fetchPosts]);
  
  // Exercice 4 - Implémenter la fonction pour charger plus de posts
  const loadMorePosts = useCallback(() => {
    if (!loading && skip < total) {
      fetchPosts();
    }
  }, [loading, skip, total, fetchPosts]);
  
  // Exercice 3 - Utiliser useMemo pour calculer les tags uniques
  const uniqueTags = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags);
    return [...new Set(allTags)];
  }, [posts]);
  
  // Exercice 4 - Implémenter la fonction pour charger un post par son ID
  const fetchPostById = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    posts,
    loading,
    error,
    skip,
    total,
    selectedPost,
    uniqueTags,
    fetchPosts,
    loadMorePosts,
    fetchPostById
  };
}

export default usePosts;
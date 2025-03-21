import { useEffect, useState } from 'react';
import RepositoryRepository from '../apiServices/repository/RepositoryRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FAVORITES_KEY = 'favorite_repositories';

export const repositoryViewModel = () => {
    const [repositories, setRepositories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchRepositories = async (query: string, per_page: number, newPage: number, append: boolean = false) => {
        if (loading || isFetchingMore) return;

        if (!append) {
            setLoading(true);
            setRepositories([]);
            setPage(1);
            setHasMore(true);
        } else {
            setIsFetchingMore(true);
        }
        setError(null);

        try {
            const data = await RepositoryRepository.getRepositories(query, per_page, newPage);

            if (!data || data.length === 0) {
                setHasMore(false);
                return;
            }

            setRepositories((prevRepos) => (append ? [...prevRepos, ...data] : data));
            setPage(newPage + 1);
        } catch (err) {
            setError('Failed to load repositories');
        } finally {
            append ? setIsFetchingMore(false) : setLoading(false);
        }
    };

    const loadMoreRepositories = (query: string, per_page: number) => {
        if (hasMore && !loading && !isFetchingMore) {
            fetchRepositories(query, per_page, page, true);
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            setRepositories([]);
            setHasMore(true);
        } else {
            fetchRepositories(searchQuery, 10, 1);
        }
    }, [searchQuery]);

    return {
        repositories,
        loading,
        error,
        isFetchingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        fetchRepositories,
        loadMoreRepositories,
    };
};

export const toggleFavoriteLocal = async (repoId: any) => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        let favoriteList = favorites ? JSON.parse(favorites) : [];

        if (favoriteList.includes(repoId)) {
            favoriteList = favoriteList.filter((id: any) => id !== repoId);
        } else {
            favoriteList.push(repoId);
        }

        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteList));
        return favoriteList.includes(repoId);
    } catch (error) {
        console.error('Error managing favorites:', error);
        return false;
    }
};


export const isFavorite = async (repoId: any) => {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    const favoriteList = favorites ? JSON.parse(favorites) : [];
    return favoriteList.includes(repoId);
};


export const getFavoriteRepositories = async () => {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};


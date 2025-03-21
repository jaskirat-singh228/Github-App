import apiClient from "../apiClient";

class RepositoryRepository {
    async getRepositories(query: string, per_page: number, page: number): Promise<any> {
        try {
            const response = await apiClient.get('/search/repositories', {
                params: {
                    q: query,
                    per_page,
                    page,
                },
            });

            if (!response.data || !response.data.items) {
                return [];
            }

            return response.data.items;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

export default new RepositoryRepository();

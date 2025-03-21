import SplashScreen from "../screens/SplashScreen";
import FavoriteRepoScreen from "../screens/FavoriteRepoScreen";
import RepoDetailScreen from "../screens/RepoDetailScreen";
import RepositoryListScreen from "../screens/RepositoryListScreen";

export type RootStackParamList = {
    SplashScreen: undefined;
    RepositoryListScreen: undefined;
    RepoDetailScreen: undefined;
    FavoriteRepoScreen: undefined;
};

interface StackItem {
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;
}

export const mStacks: StackItem[] = [
    { name: "SplashScreen", component: SplashScreen },
    { name: "RepositoryListScreen", component: RepositoryListScreen },
    { name: "RepoDetailScreen", component: RepoDetailScreen },
    { name: "FavoriteRepoScreen", component: FavoriteRepoScreen },
];

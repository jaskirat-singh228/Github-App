import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Platform, ToastAndroid, BackHandler, } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../components/Header';
import { repositoryViewModel } from '../viewmodel/RepositoryViewModel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { debounce } from 'lodash';
import AnimatedCard from '../components/AnimatedCard';


const RepositoryListScreen = () => {
    const { colors } = useTheme();
    const { repositories, loading, error, isFetchingMore, fetchRepositories, loadMoreRepositories } = repositoryViewModel();
    const [searchQuery, setSearchQuery] = useState('');
    const [backPressedOnce, setBackPressedOnce] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.items);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            fetchRepositories(query, 10, 1);
        }, 800),
        []
    );

    useEffect(() => {
        const backAction = () => {
            if (backPressedOnce) {
                BackHandler.exitApp();
            } else {
                setBackPressedOnce(true);
                ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

                setTimeout(() => {
                    setBackPressedOnce(false);
                }, 2000);
            }
            return true;
        };

        debouncedSearch(searchQuery);

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [searchQuery, backPressedOnce]);

    const renderFooter = () => {
        if (!isFetchingMore) return null;
        return <ActivityIndicator size="small" style={styles.footerLoader} />;
    };

    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header onSearch={(query: any) => setSearchQuery(query)} />
            {loading ? <ActivityIndicator size="large" style={styles.loading} /> :
                <FlatList
                    style={{ marginTop: 10 }}
                    data={repositories}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <AnimatedCard item={item} />}
                    onEndReached={() => loadMoreRepositories(searchQuery, 10)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: Platform.OS == 'android' ? 25 : 60
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    repoItem: {
        flex: 1,
        margin: 5,
    },
    card: {
        padding: 10,
        borderRadius: 10,
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    ownerName: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    repoName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'capitalize'
    },
    description: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
        textTransform: 'capitalize'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    starView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stat: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5
    },
    icon: {
        height: 18,
        width: 18,
    },
    itemFavIcon: {
        height: 22,
        width: 22,
    },
    language: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
        textTransform: 'capitalize',
        marginLeft: 5
    },
    footerLoader: {
        paddingVertical: 16,
    },
    updatedAt: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
    },
});

export default RepositoryListScreen;

import { Alert, Animated, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Card } from 'react-native-paper';
import { Image } from 'react-native-animatable';
import { RouteProp, useNavigation, useTheme } from '@react-navigation/native';
import { forks, language, star, filledHeart, unfilledHeart } from '../utills/ImagePath';
import { formatDate } from '../utills/DateFormat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { removeItem } from '../redux/slices/RepositorySlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../components/BackButton';

export type RootStackParamList = {
    RepositoryListScreen: undefined;
    RepoDetailScreen: { item: any };
};

export type RepoListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RepositoryListScreen'>;
export type RepoDetailRouteProp = RouteProp<RootStackParamList, 'RepoDetailScreen'>;

const FavoriteRepoScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<RepoListNavigationProp>()
    const dispatch = useDispatch<AppDispatch>();

    const favoriteRepositories = useSelector((state: RootState) => state.items);

    const AnimatedCard = ({ item }: { item: any }) => {

        const fadeAnim = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, []);

        // Check if this item is in favorites
        const isFavorite = favoriteRepositories.some(repo => repo.id === item.id);

        return (
            <Animated.View style={[styles.repoItem, { opacity: fadeAnim }]}>
                <Card onPress={() => navigation.navigate('RepoDetailScreen', { item })} style={[styles.card, { backgroundColor: colors.card }]}>
                    <View style={[styles.ownerContainer, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                        <View style={styles.ownerContainer}>
                            <Image source={{ uri: item?.owner.avatar_url }} style={styles.avatar} />
                            <View>
                                <Text style={[styles.ownerName, { color: colors.text }]}>{item?.owner.login}</Text>
                                <Text style={[styles.updatedAt, { color: colors.text }]}>Updated on: {formatDate(item?.updated_at)}</Text>
                            </View>
                        </View>
                        <Button title='Remove' onPress={() => dispatch(removeItem(item.id))} />
                    </View>
                    <Text style={[styles.repoName, { color: colors.text }]}>{item?.name}</Text>
                    {item.description && <Text numberOfLines={2} style={styles.description}>{item?.description}</Text>}
                    <View style={styles.statsContainer}>
                        <View style={styles.starView}>
                            <Image source={star} style={[styles.icon, { tintColor: '#FCC737' }]} />
                            <Text style={[styles.stat, { color: colors.text }]}>{item?.stargazers_count}</Text>
                        </View>
                        <View style={styles.starView}>
                            <Image source={forks} style={[styles.icon, { tintColor: colors.text }]} />
                            <Text style={[styles.stat, { color: colors.text }]}>{item?.forks_count}</Text>
                        </View>
                        <View style={styles.starView}>
                            <Image source={language} style={[styles.icon, { tintColor: colors.text }]} />
                            {item?.language && <Text style={styles.language}>{item?.language}</Text>}
                        </View>
                    </View>
                </Card>
            </Animated.View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <BackButton title={'Favorite Repositories'} />
            {favoriteRepositories.length === 0 ? (
                <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={styles.noFavorites}>No favorite repositories yet!</Text>
                </View>
            ) : (
                <FlatList
                    style={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={favoriteRepositories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <AnimatedCard item={item} />}
                    onEndReachedThreshold={0.5}
                />
            )}
        </View>
    );
};

export default FavoriteRepoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: Platform.OS == 'android' ? 25 : 60
    },
    noFavorites: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
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
    updatedAt: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
    },
});

import { RouteProp, useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { View, Text, Animated, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import { formatDate } from '../utills/DateFormat';
import { filledHeart, forks, language, star, unfilledHeart } from '../utills/ImagePath';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { addItem, removeItem } from '../redux/slices/RepositorySlice';

export type RootStackParamList = {
    RepositoryListScreen: undefined;
    RepoDetailScreen: { item: any };
};

export type RepoListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RepositoryListScreen'>;
export type RepoDetailRouteProp = RouteProp<RootStackParamList, 'RepoDetailScreen'>;

const AnimatedCard = ({ item }: { item: any }) => {
    const { colors } = useTheme();
    const navigation = useNavigation<RepoListNavigationProp>();
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.items);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleAddItem = (item: any) => {
        const isFavorite = items.some(favItem => favItem.id === item.id && favItem.isFavorite);
        if (isFavorite) {
            dispatch(removeItem(item.id));
        } else {
            dispatch(addItem({ ...item, isFavorite: true }));
        }
    };

    return (
        <Animated.View style={[styles.repoItem, { opacity: fadeAnim }]}>
            <Card onPress={() => navigation.navigate('RepoDetailScreen', { item })} style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={[styles.ownerContainer, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                    <View style={styles.ownerContainer}>
                        <Image resizeMode='contain' source={{ uri: item?.owner.avatar_url }} style={styles.avatar} />
                        <View>
                            <Text style={[styles.ownerName, { color: colors.text }]}>{item?.owner.login}</Text>
                            <Text style={[styles.updatedAt, { color: colors.text }]}>Updated on: {formatDate(item?.updated_at)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => handleAddItem(item)}>
                        <Image source={items.some(favItem => favItem.id === item.id && favItem.isFavorite) ? filledHeart : unfilledHeart}
                            style={[styles.itemFavIcon, { tintColor: items.some(favItem => favItem.id === item.id && favItem.isFavorite) ? 'red' : '#888' }]} />
                    </TouchableOpacity>
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

const styles = StyleSheet.create({
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

export default AnimatedCard;

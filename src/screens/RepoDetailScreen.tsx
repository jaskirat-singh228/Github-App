import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import { star, forks, language } from '../utills/ImagePath';
import { RepoDetailRouteProp } from './RepositoryListScreen';
import { formatDate } from '../utills/DateFormat';
import BackButton from '../components/BackButton';

const RepoDetailScreen = () => {
    const { colors } = useTheme();
    const route = useRoute<RepoDetailRouteProp>();
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <BackButton title={'Repository Details'} />
            <View style={styles.ownerContainer}>
                <Image resizeMode='contain' source={{ uri: item.owner.avatar_url }} style={[styles.avatar, { borderColor: colors.text }]} />
                <Text style={[styles.ownerName, { color: colors.text }]}>{item.owner.login}</Text>
            </View>
            <Text style={[styles.repoName, { color: colors.text }]}>{item.name}</Text>
            {item.description && <Text style={styles.description}>{item.description}</Text>}
            <View style={styles.statItem}>
                <Image source={star} style={[styles.icon, { tintColor: '#FCC737' }]} />
                <Text style={[styles.statText, { color: colors.text }]}>{item.stargazers_count}</Text>
            </View>
            <View style={styles.statItem}>
                <Image source={forks} style={[styles.icon, { tintColor: colors.text }]} />
                <Text style={[styles.statText, { color: colors.text }]}>{item.forks_count}</Text>
            </View>
            <View style={styles.statItem}>
                <Image source={language} style={[styles.icon, { tintColor: colors.text }]} />
                {item.language && <Text style={[styles.statText, { color: colors.text }]}>{item.language}</Text>}
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.updatedAt}>Created on: {formatDate(item.created_at)}</Text>
                <Text style={styles.updatedAt}>Updated on: {formatDate(item.updated_at)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: Platform.OS == 'android' ? 25 : 60
    },
    ownerContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
    },
    ownerName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5
    },
    updatedAt: {
        fontSize: 16,
        color: '#888',
        marginTop: 4,
    },
    repoName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textTransform: 'capitalize',
    },
    description: {
        fontSize: 16,
        color: '#888',
        marginBottom: 15,
        lineHeight: 22,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    statText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    icon: {
        width: 25,
        height: 25,
    },
    back: {
        width: 30,
        height: 30,
        marginBottom: 10
    },
});

export default RepoDetailScreen;

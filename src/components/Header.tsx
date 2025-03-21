import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { clear, moon, search, sun, unfilledHeart } from '../utills/ImagePath';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { toggleTheme } from '../redux/slices/ThemeSlice';

interface HeaderProps {
    onSearch: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const themeMode = useSelector((state: RootState) => state.theme.theme);

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearch = useCallback(
        debounce((text: string) => {
            onSearch(text);
        }, 1000),
        []
    );

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText]);

    return (
        <View style={[styles.mainView, { backgroundColor: colors.background }]}>
            <View style={[styles.inputContainer, { backgroundColor: colors.border }]}>
                <Image source={search} style={styles.icon} />
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Search Repositories..."
                    placeholderTextColor={colors.text}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <Pressable onPress={() => setSearchText('')}>
                        <Image source={clear} style={styles.clearIcon} />
                    </Pressable>
                )}
            </View>
            <Pressable onPress={() => navigation.navigate('FavoriteRepoScreen' as never)}>
                <Image source={unfilledHeart} style={[styles.sun, { tintColor: colors.text }]} />
            </Pressable>
            <Pressable onPress={() => dispatch(toggleTheme())}>
                {themeMode == 'light' ? <Image source={sun} style={styles.sun} />
                    : <Image source={moon} style={[styles.sun, { tintColor: '#ffffff' }]} />}
            </Pressable>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sun: {
        height: 24,
        width: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        width: '80%',
    },
    icon: {
        marginRight: 5,
        width: 24,
        height: 24,
        tintColor: '#9f9f9f',
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    clearIcon: {
        marginLeft: 5,
        width: 20,
        height: 20,
        tintColor: '#9f9f9f',
    },
});

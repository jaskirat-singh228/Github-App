import { CommonActions, useNavigation, useTheme } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { logo } from '../utills/ImagePath';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    RepositoryListScreen: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RepositoryListScreen'>;

const SplashScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const logoRef = useRef<Animatable.Image & Image>(null);

    useEffect(() => {
        if (logoRef.current) {
            logoRef.current.animate('zoomIn', 1500).then(() => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'RepositoryListScreen' }],
                    })
                );
            });
        }
    }, [navigation]);

    return (
        <View style={[styles.mainView, { backgroundColor: colors.background }]}>
            <Animatable.Image
                ref={logoRef}
                source={logo}
                style={{ height: 90, width: 90, tintColor: colors.text }}
                resizeMode="contain"
            />
            <Text style={[styles.appName, { color: colors.text }]}>GitHub</Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    appName: {
        fontSize: 30,
        fontWeight: '800',
        marginVertical: 20,
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

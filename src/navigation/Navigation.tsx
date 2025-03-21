import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useCustomTheme } from '../utills/MyTheame';
import MainNavigator from './MainNavigator';

const Navigation = () => {
    const theme = useCustomTheme();
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.colors.background,
            border: theme.colors.border,
            card: theme.colors.card,
            notification: theme.colors.notification,
            primary: theme.colors.primary,
            text: theme.colors.text,
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <MainNavigator />
        </NavigationContainer>
    );
};

export default Navigation;

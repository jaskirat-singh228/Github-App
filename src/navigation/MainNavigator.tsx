import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mStacks, RootStackParamList } from '../utills/ScreenList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SplashScreen"
        >
            {mStacks.map((item) => (
                <Stack.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                />
            ))}
        </Stack.Navigator>
    );
};

export default MainNavigator;

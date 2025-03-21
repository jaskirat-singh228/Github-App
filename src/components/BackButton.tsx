import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { back } from '../utills/ImagePath'
import { useNavigation, useTheme } from '@react-navigation/native';

const BackButton = ({ title }: any) => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={back} style={[styles.back, { tintColor: colors.text }]} />
            </TouchableOpacity>
            <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    back: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 10
    }
})
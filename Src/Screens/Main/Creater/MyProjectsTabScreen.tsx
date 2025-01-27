import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { getStyles } from '../../../CommonStyles'
import { ThemeContext } from '../../../Providers/ThemeProvider'
import { WrapperContainer } from '../../../Components'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useIsFocused } from '@react-navigation/native'

const MyProjectsTabScreen: FC<any> = () => {
    const { lang, colors } = getStyles(ThemeContext)
    const isFocused = useIsFocused()
    useEffect(() => {
        SystemNavigationBar.setNavigationColor(colors.appBg, 'light', 'navigation')
    }, [isFocused]);

    return (
        <WrapperContainer
        >
            <View
                style={styles.container}
            >
                <Text>My Projects</Text>
            </View>
        </WrapperContainer>

    )
}

export default MyProjectsTabScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
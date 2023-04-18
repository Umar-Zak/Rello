import React from "react";
import  "styled-components"
import styled from "styled-components/native"
import {StyleSheet} from "react-native"
interface ScreenInterface {
    style?: StyleSheet.NamedStyles<unknown>,
    children?: React.ReactElement

}
function Screen({style, children}: ScreenInterface) {
    return (
           <SafeView style={style}>
            {children}
            </SafeView>
    );
}

const SafeView = styled.SafeAreaView`
    
`

export default Screen;

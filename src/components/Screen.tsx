import React from 'react';
import  "styled-components"
import styled from "styled-components/native"
interface ScreenInterface {
    style?: {},
    children?: React.ReactElement

}
function Screen({style, children}: ScreenInterface) {
    return (
           <SafeView>
            {children}
            </SafeView>
    );
}

const SafeView = styled.SafeAreaView`
    
`

export default Screen;
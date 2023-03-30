import React from 'react';
import { AnyAction } from 'redux';
import styled from 'styled-components/native';
import { useAppDispatch } from '../hooks/CustomReduxHooks';
import {closeVerificationModal} from "../store/ui/UI"

const OverlayModal = () => {
    const dispatch = useAppDispatch()
    return ( 
        <Container onPress={() => dispatch(closeVerificationModal() as unknown as AnyAction)}>

        </Container>
     );
}
 
export default OverlayModal;

const Container = styled.TouchableOpacity`
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.2);
 position: absolute;
 top: 0;
 left: 0;
 z-index: 100
`

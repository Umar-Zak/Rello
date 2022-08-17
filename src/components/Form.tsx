import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Formik} from "formik"
import * as Yup from "yup"
import "styled-components"
import styled from "styled-components/native"
interface FormInterface {
 initialValues : {}
 validationSchema: Yup.AnyObjectSchema
 children: React.ReactElement
 onSubmit: (values: any) => void
 
}
function Form({children ,initialValues, onSubmit, validationSchema}: FormInterface) {
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
            {
                ({}) => (
                    <KeyboardAwareScrollView 
                    style={{flex: 1, marginBottom: 70}} 
                    showsVerticalScrollIndicator={false} 
                     
                    >
                  {children}
                    </KeyboardAwareScrollView>
                )
            }
        </Formik>
    );
}

const Scroll = styled.ScrollView`
    /* width: 100%; */
`

// const KeyBoardAvoidingView = styled.KeyboardAvoidingView`
// flex: 1;
// `

export default Form;
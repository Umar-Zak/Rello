import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {Formik} from "formik"
import * as Yup from "yup"
import "styled-components"
import styled from "styled-components/native"
interface FormInterface {
 initialValues : {}
 validationSchema: Yup.AnyObjectSchema
 children: React.ReactElement
 onSubmit: (values: any) => void
 isKeyBoardAvoidingNeeded?: boolean
 
}
function Form({children ,initialValues, isKeyBoardAvoidingNeeded, onSubmit, validationSchema}: FormInterface) {

    const handleFormSubmission = async(values: any, resetForm: any) => {
        await onSubmit(values)
        resetForm()
    }

   if(!isKeyBoardAvoidingNeeded as boolean) return (
        <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => handleFormSubmission(values, resetForm)}
        validationSchema={validationSchema}
        >
            {
                () => (
                    <KeyboardAwareScrollView 
                    style={{flex: 1, marginBottom: 70}} 
                    showsVerticalScrollIndicator={false} 
                     
                    >
                  {children}
                    </KeyboardAwareScrollView>
                )
            }
        </Formik>
    )

    else return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
            {
                () => (
                    <ContentContainer>
                      {children}
                    </ContentContainer>
                )
            }
        </Formik>
    )
}

// const Scroll = styled.ScrollView`
//     /* width: 100%; */
// `

// const KeyBoardAvoidingView = styled.KeyboardAvoidingView`
// flex: 1;
// `


export default Form;

const ContentContainer = styled.View`
 width: 100%;
 height: 250px
`
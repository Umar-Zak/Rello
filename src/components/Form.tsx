import React from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
interface FormInterface {
 initialValues : {}
 validationSchema: Yup.AnyObjectSchema
 children: React.ReactElement
 onSubmit: (values: {}) => void
 
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
                    <>
                    {children}
                    </>
                )
            }
        </Formik>
    );
}

export default Form;
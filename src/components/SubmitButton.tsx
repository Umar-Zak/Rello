import React from "react";
import {useFormikContext} from "formik"
import Button from "./Button";

type Submit = {
    text: string
}
function SubmitButton({text}: Submit) {
    const {handleSubmit} = useFormikContext()
    return (
        <Button handleClick={handleSubmit} text={text} />
    );
}

export default SubmitButton;
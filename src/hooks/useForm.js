import { useState } from "react";

export default function useForm(submitHandler, initalValues) {
    const [values, setValues] = useState(initalValues);

    const onChange = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        console.log(values);
    }
    return {
        values,
        onChange,
        onSubmit
    }
}
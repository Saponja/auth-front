import React, {useState, useEffect} from 'react';


const useForm = (initalValues) => {

    const [values, setValues] = useState(initalValues)

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    return {
        values,
        setValues,
        handleInputChange
    };
}

export default useForm;
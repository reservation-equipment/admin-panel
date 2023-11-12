import React from 'react';


type PropsInput = {
    wrapperStyle: string,
    inputStyle: string
    value: string
    placeholder: string,

}
const TextInput = (options: PropsInput) => {
    const {wrapperStyle, inputStyle, value, placeholder} = options;
    return (
        <div className={wrapperStyle}>
            <input value={value} className={inputStyle} placeholder={placeholder}/>
        </div>
    );
};

export default TextInput;

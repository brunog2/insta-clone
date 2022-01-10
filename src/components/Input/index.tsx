import React, { useState, useEffect, ChangeEventHandler } from 'react';

import './styles.scss';

interface InputProps {
    placeholder: string,
    value: string,
    name?: string,
    type?: string,
    onChange: ChangeEventHandler
}

const Button: React.FC<InputProps> = (props) => {
    const [inputText, setInputText] = useState<string>(props.value);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
        props.onChange(e);
    }

    return (
        <div className="input-container">
            <label>
                <span className={`span ${inputText != "" ?  "span--filled" : ""}`}>{props.placeholder}</span>
                <input name={props.name} type={props.type != undefined ? props.type : "text"} className={`input ${inputText != "" ?  "input--filled" : ""}`} value={inputText} onChange={handleInputChange}></input>
            </label>            
        </div>
    )
};

export default Button;
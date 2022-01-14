import React, { useState, useEffect, ChangeEventHandler } from 'react';

import './styles.scss';

interface InputProps {
    placeholder: string,
    value: string,
    name?: string,
    type?: string,
    statusType?: "valid" | "error",
    statusReload?: boolean,
    onChange: ChangeEventHandler
}

const Button: React.FC<InputProps> = (props) => {
    const [inputText, setInputText] = useState<string>(props.value);
    const [statusReload, setStatusReload] = useState<string>("");

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
        props.onChange(e);
    }

    return (
        <div className="input-container">
            <label>
                <span className={`span ${inputText != "" ? "span--filled" : ""}`}>{props.placeholder}</span>
                <input name={props.name} type={props.type != undefined ? props.type : "text"} className={`input ${inputText != "" ? "input--filled" : ""}`} value={inputText} onChange={handleInputChange}></input>
                <span className={
                    `span-input-status                    
                    ${props.statusType != undefined ? `span-input-status--${props.statusType}` : "span-input-status--no-status"}`}>
                </span>
                <span className={
                    `span-input-status                
                    ${props.statusReload ? `span-input-status--reload` : 'span-input-status--no-reload'}`}>
                </span>
            </label>
        </div>
    )
};

export default Button;
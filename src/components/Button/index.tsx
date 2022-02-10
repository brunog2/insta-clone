import React, { useEffect, useState, CSSProperties } from 'react';

import LoadingAnimation from '../LoadingAnimation';

import './styles.scss';

interface ButtonProps {
    value?: string,
    element?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    buttonStyle?: string,
    type?: "button" | "submit" | "reset",
    style?: CSSProperties,
    onClick?: React.MouseEventHandler<HTMLElement>
}

const Button: React.FC<ButtonProps> = (props) => {
    const [buttonStyle, setbuttonStyle] = useState<string>(props.buttonStyle !== undefined ? props.buttonStyle : "disabled");

    useEffect(() => {
        setbuttonStyle(props.buttonStyle !== undefined ? props.buttonStyle : "enabled");
    }, [props])

    return (
        <button style={props.style} type="submit" className={`button ${buttonStyle !== undefined ? `button--${buttonStyle}` : ""}`} onClick={props.onClick}>
            {buttonStyle === "loading" ?
                <LoadingAnimation />
                : props.value !== undefined ?
                    props.value
                    : props.element
            }
        </button>
    )
};

export default Button;
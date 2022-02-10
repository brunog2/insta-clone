import React, { CSSProperties } from 'react';
import './styles.scss';

interface AlternativeActionProps {
    text: string,
    sugestedAction: string,
    actionRoute: string,
    containerStyles?: CSSProperties,
    subContainerStyles?: CSSProperties,
    linkStyles?: CSSProperties
}

const AlternativeAction: React.FC<AlternativeActionProps> = (props) => {
    return (
        <div style={props.containerStyles} className="alternative-container">
            <div style={props.subContainerStyles}>
                <p>
                    {`${props.text} `}
                    <a href={`${props.actionRoute}`} style={props.linkStyles}>{props.sugestedAction}</a>
                </p>
            </div>
        </div>
    )
}

export default AlternativeAction;
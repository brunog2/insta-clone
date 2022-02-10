import React from 'react';
import './styles.scss';

interface AlternativeSeparatorProps {

}

const AlternativeSeparator: React.FC<AlternativeSeparatorProps> = (props) => {
    return (
        <div className="alternative-entry-text-container">
            <div className="text-side-border"></div>
            <div className="alternative-entry-text">
                OU
            </div>
            <div className="text-side-border"></div>
        </div>
    )
}

export default AlternativeSeparator;
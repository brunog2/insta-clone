import React, { useEffect, useState, CSSProperties } from 'react';

interface MoreOptionsProps {
    className?: string,
}

const MoreOptions: React.FC<MoreOptionsProps> = (props) => {

    return (
        <div className={props.className}>
            <svg aria-label="Mais opções" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
        </div>
    )
};

export default MoreOptions;


import React, { useEffect, useState, CSSProperties } from 'react';

interface SaveProps {
    className?: string,
}

const Save: React.FC<SaveProps> = (props) => {

    return (
        <div className={props.className}>
            <svg aria-label="Salvar" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                </polygon>
            </svg>
        </div>
    )
};

export default Save;
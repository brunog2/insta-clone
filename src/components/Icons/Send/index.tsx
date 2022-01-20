import React, { useEffect, useState, CSSProperties } from 'react';

interface SendProps {
    className?: string,
}

const Send: React.FC<SendProps> = (props) => {

    return (
        <div className={props.className}>
            <svg aria-label="Compartilhar publicação" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083">
                </line>
                <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2">
                </polygon>
            </svg>
        </div>
    )
};

export default Send;
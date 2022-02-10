import React, { useEffect, useState, CSSProperties } from 'react';

interface CommentProps {
    className?: string,
}

const Comment: React.FC<CommentProps> = (props) => {
   
    return (
        <div className={props.className}>
            <svg aria-label="Comentar" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2">
                </path>
            </svg>
        </div>
    )
};

export default Comment;
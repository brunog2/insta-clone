import React, { useEffect, useState, CSSProperties, ChangeEventHandler } from 'react';

import styles from './searchinput.module.scss';
import '../../../styles/global.scss';

interface SearchInputProps {
    value: string,
    style?: CSSProperties,
    className?: string,
    onChange: ChangeEventHandler
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
    const [inputText, setInputText] = useState<string>(props.value);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
        props.onChange(e);
    }

    return (
        <div className={`${styles.searchContainer} ${props.className} ${inputText ? styles.searchContainerSelected : ''}`}>
            <div className={styles.inputContainer}>
                <input value={inputText} onChange={handleInputChange}></input>
                <div className={inputText != "" ? styles.spanContainerFilled : styles.spanContainer}>
                    <div className={styles.searchIconContainer}>
                        <svg aria-label="Pesquisar" className={styles.searchIcon} color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
                            <path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            </path>
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22">
                            </line>
                        </svg>
                    </div>
                    <span>Pesquisar</span>
                </div>
                <div className={styles.deleteText} onClick={() => setInputText('')}>

                </div>
            </div>



        </div>
    )
};

export default SearchInput;
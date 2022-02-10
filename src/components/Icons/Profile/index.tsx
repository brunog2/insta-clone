import React, { useEffect, useState, CSSProperties } from 'react';

interface ProfileProps {
    selected?: boolean,
    className?: string,
    onClick?: () => void
}

const Profile: React.FC<ProfileProps> = (props) => {
    const [selected, setSelected] = useState<boolean>();

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])
    return (
        <div className={props.className} onClick={props.onClick}>
            {selected ? <div className='profileActive'></div> : ""}
            <img alt="Foto do perfil de eu__bru.no" draggable="false" src="https://cdn130.picsart.com/318381621277201.jpg" />
        </div>
    )
};

export default Profile;
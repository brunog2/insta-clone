import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import LoadingAnimation from '../../components/LoadingAnimation';
import Button from '../../components/Button';

import styles from './feed.module.scss';

interface User {
    "id": number,
    "full_name": string,
    "email": string | null,
    "phone_number": string | null,
    "username": string | null,
    "password": string
}

const Feed: React.FC = () => {
    const [auth, setAuth] = useState<boolean>();
    const [user, setUser] = useState<User>();
    const [buttonStyle, setButtonStyle] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        async function verifyAuth() {
            console.log('cookies feed', document.cookie)
            await api.post("/posts").then((response) => {
                const { auth, user } = response.data;
                setAuth(auth);
                setUser(user);
            }).catch((err) => {
                navigate("/login")
            })
        }

        verifyAuth();
    }, []);


    function handleLogout() {
        api.post("/logout")
    }

    if (auth) {
        return (
            <form className={styles.loadingContainer} onSubmit={handleLogout}>
                <h2 style={{ color: "#262626" }}>Olá, {user?.full_name.substring(0, user.full_name.search(" "))} :)</h2>
                <Button value='Logout' style={{ backgroundColor: "#ed4956" }} type="submit"
                    onClick={() => setButtonStyle("loading")}
                    buttonStyle={buttonStyle} />
            </form>
        )
    } else {
        return <div className={styles.loadingContainer}><LoadingAnimation color='#000' /></div>
    }

}

export default Feed;
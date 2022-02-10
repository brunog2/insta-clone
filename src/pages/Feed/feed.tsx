import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import LoadingAnimation from '../../components/LoadingAnimation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Post from '../../components/Post';

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
    const [auth, setAuth] = useState<boolean>(true);
    const [user, setUser] = useState<User>();
    const [buttonStyle, setButtonStyle] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        // async function verifyAuth() {
        //   console.log('cookies feed', document.cookie)
        // await api.post("/posts").then((response) => {
        //   const { auth, user } = response.data;
        // setAuth(auth);
        // setUser(user);
        //}).catch((err) => {
        //   navigate("/login")
        // })
        // }

        //verifyAuth();
        alert("vc ta no feed :)")
    }, []);


    function handleLogout() {
        api.post("/logout")
    }

    if (auth) {
        return (
            <>
                <Header selectedIcon='feed' />
                <div className={styles.mainContainer}>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </div>
                <Footer selectedIcon='feed' className={styles.footer}/>
            </>
        )
    } else {
        return <div className={styles.loadingContainer}><LoadingAnimation color='#000' /></div>
    }

}

export default Feed;
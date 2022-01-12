import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './posts.module.scss';

const Posts: React.FC = () => {
    const [authUser, setAuthUser] = useState<boolean>();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchApi() {
            await api.post("/posts").then((response) => {
                const { auth } = response.data;
                alert('a')
                auth ? setAuthUser(true) : setAuthUser(false)
            }).catch((err) => {
                setAuthUser(false);
            })
        }
        fetchApi();
    }, [])

    useEffect(() => {
        if (authUser != undefined && !authUser) navigate("/login")
    }, [authUser])

    return (
        authUser ? <p>You are logged in :)</p> : <></>
    )

}

export default Posts;
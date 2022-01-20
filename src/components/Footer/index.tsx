import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Feed from '../Icons/Feed'
import Explore from '../Icons/Explore'
import NewPost from '../Icons/NewPost'
import Activity from '../Icons/Activity';
import Profile from '../Icons/Profile'

import styles from './footer.module.scss';
import '../../styles/global.scss'

interface FooterProps {
    selectedIcon: string,
    className?: string,
}

const Footer: React.FC<FooterProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div className={[styles.footerMainContainer, props.className].join(' ')}>
            <div className={styles.footerContentContainer}>
                <Feed className={styles.feed} selected={props.selectedIcon === "feed"} onClick={() => navigate("/")} />
                <Explore className={styles.explore} selected={props.selectedIcon === "explore"} onClick={() => navigate("/explore")} />
                <NewPost className={styles.newPost} selected={props.selectedIcon === "newPost"} />
                <Activity className={styles.activity} selected={props.selectedIcon === "activity"} />
                <Profile className={styles.profile} selected={props.selectedIcon === "profile"}/>
            </div>
        </div >
    )
};

export default Footer;
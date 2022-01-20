import React, { useEffect, useState } from 'react';

import MoreOptions from '../Icons/MoreOptions';
import Activity from '../Icons/Activity';
import Comment from '../Icons/Comment';
import Send from '../Icons/Send';
import Save from '../Icons/Save';
import Emoji from '../Icons/Emoji';

import styles from './post.module.scss';

const post = require('../../assets/post.jpg')
const white = require(('../../assets/white.png'))

interface PostProps {

}

const Post: React.FC<PostProps> = (props) => {

    function handleKeyDown(e: HTMLTextAreaElement) {
        e.style.height = `${e.scrollHeight}px`;
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.postAuthorContainer}>
                <div className={styles.authorInforContainer}>
                    <img draggable="false" src={"https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1425034585/content-items/001/228/844/sesion-estudio-barcelona-10-original.jpg"} />
                    <div className={styles.authorInfor}>
                        <a href='#' className={styles.authorUsername}>meltedvideos</a>
                    </div>
                </div>
                <MoreOptions className={styles.userAction} />
            </div>
            <div className={styles.imageContainer}>
                <img src={post} alt="" />
            </div>
            <div className={styles.inforContainer}>
                <div className={styles.userActionsContainer}>
                    <div className={styles.primaryActions}>
                        <Activity className={styles.userAction} />
                        <Comment className={styles.userAction} />
                        <Send className={styles.userAction} />
                    </div>
                    <Save className={[styles.userAction, styles.save].join(' ')} />
                </div>
                <div className={styles.likesContainer}>
                    <img draggable="false" src="https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1425034585/content-items/001/228/844/sesion-estudio-barcelona-10-original.jpg" />
                    <p>{"Curtido por "}</p>
                    <a>john.andrew</a>
                    <p>{" e "}</p>
                    <a>outras 2.387 pessoas</a>
                </div>
                <div className={styles.descriptionContainer}>
                    <p className={styles.description}>
                        <a className={styles.authorUsername}>meltedvideos</a>
                        {" "}
                        Viagem mais insana da vida!! Essa vai entrar para a história 1000km de chevette capotado
                    </p>
                </div>
                <div className={styles.commentsContainer}>
                    <a className={styles.seeComments}>Ver todos os 98 comentários</a>
                    <p className={styles.description}>
                        <a className={styles.authorUsername}>project.racing</a>
                        {" "}
                        Será que debaixo desse capô entra um c20xe?
                    </p>
                    <p className={styles.description}>
                        <a className={styles.authorUsername}>rg_telles</a>
                        {" "}
                        agora tem ferrari e o ferrado kkkkkk
                    </p>
                </div>
                <div className={styles.postDateContainer}>
                </div>
                <div className={styles.newCommentContainer}>

                    <Emoji className={[styles.userAction, styles.emoji].join(' ')} />
                    <textarea rows={4} placeholder='Adicione um comentário...' onKeyDown={(e) => handleKeyDown((e.target as HTMLTextAreaElement))}></textarea>
                    <div className={styles.publishCommentContainer}>
                        <p>Publicar</p>
                    </div>

                </div>
            </div>

        </div>
    )
};

export default Post;
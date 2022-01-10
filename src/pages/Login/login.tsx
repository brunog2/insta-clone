import React, { useEffect, useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import GetApp from '../../components/GetAppContainer';
import AlternativeAction from '../../components/AlternativeActionContainer';
import AlternativeSeparator from '../../components/AlternativeSeparatorContainer';

import styles from './login.module.scss';

const Login: React.FC = () => {
    const [buttonStyle, setbuttonStyle] = useState<string>("disabled");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (username.length > 0 && password.length > 5) {
            setbuttonStyle("enabled");
        } else {
            if (buttonStyle != "disabled") {
                setbuttonStyle("disabled");
            }
        }
    }, [username, password])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.name == "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setbuttonStyle("loading");
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}></h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input value={username} name="username" placeholder="Telefone, nome de usuário ou email" onChange={handleInputChange} />
                    <Input value={password} name="password" placeholder="Senha" type="password" onChange={handleInputChange} />
                    <Button type="submit" value="Entrar" buttonStyle={buttonStyle} />
                </form>

                <AlternativeSeparator />

                <div className={styles.facebookEntry}>
                    <span className={styles.facebookLogo}></span>
                    <a href='#'>Entrar com o Facebook</a>
                </div>

                <a className={styles.passwordForgotten} href='#'>Esqueceu a senha?</a>
            </div>

            <AlternativeAction text="Não tem uma conta?" sugestedAction="Cadastre-se" actionRoute="/register" linkStyles={{ fontWeight: 600 }} />

            <GetApp />
        </div>
    )
}

export default Login;
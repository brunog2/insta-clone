import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import UserValidator from '../../validators/UserValidator';

import AlternativeSeparator from '../../components/AlternativeSeparatorContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AlternativeAction from '../../components/AlternativeActionContainer';
import GetApp from '../../components/GetAppContainer';

import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';

interface SpanProps {
    visible: boolean,
    value: string
}

const Login: React.FC = () => {
    const [buttonStyle, setbuttonStyle] = useState<string>("disabled");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [spanVisible, setSpanVisible] = useState<SpanProps>();

    const navigate = useNavigate();

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (buttonStyle != "disabled") {
            setbuttonStyle("loading");

            let email = null;
            let requestUsername = null;
            let phone_number = null;

            UserValidator.emailValidator(username) ? email = username :
                UserValidator.phoneValidator(username) ? phone_number = username :
                    requestUsername = username

            const data = { email, username: requestUsername, phone_number, password }

            console.log(data)

            await api.post("/login", data).then((response) => {
                const { auth, error } = response.data;
                setbuttonStyle("enabled");
                if (auth) navigate("/");
                else if (error === "user_not_found") {
                    setSpanVisible({
                        visible: true,
                        value: "O nome de usuário inserido não pertence a uma conta. Verifique seu nome de usuário e tente novamente."
                    })
                } else {
                    setSpanVisible({
                        visible: true,
                        value: "Sua senha está incorreta. Confira-a."
                    })
                }
            }).catch((error,) => {
                console.log("erro:", error)
            })
        }
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

                {spanVisible?.visible ? (
                    <div className="warningContainer">
                        <span className="spanWarning">{spanVisible.value}</span>

                    </div>
                ) : (
                    <></>
                )}

                <a className={styles.passwordForgotten} href='#'>Esqueceu a senha?</a>
            </div>

            <AlternativeAction text="Não tem uma conta?" sugestedAction="Cadastre-se" actionRoute="/register" linkStyles={{ fontWeight: 600 }} />

            <GetApp />
        </div>
    )
}

export default Login;
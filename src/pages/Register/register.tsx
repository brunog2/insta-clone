import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'
import _debounce from 'lodash/debounce';

import UserValidator from '../../validators/UserValidator';

import Input from '../../components/Input';
import Button from '../../components/Button';
import GetApp from '../../components/GetAppContainer';
import AlternativeActionContainer from '../../components/AlternativeActionContainer';
import AlternativeSeparator from '../../components/AlternativeSeparatorContainer';

import styles from './register.module.scss';

const Register: React.FC = () => {
    const [buttonStyle, setbuttonStyle] = useState<string>("disabled");
    const [generatedUsername, setGeneratedUsername] = useState<string>("");

    const [updates, setUpdates] = useState<number>(0);

    const [emailOrPhone, setEmailOrPhone] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [validEmailOrPhone, setValidEmailOrPhone] = useState<boolean>();
    const [validFullname, setValidFullname] = useState<boolean>();
    const [validUsername, setValidUsername] = useState<boolean>();
    const [validPassword, setValidPassword] = useState<boolean>();

    const navigate = useNavigate();

    const checkUser = useCallback(_debounce(async (column, value) => {
        if (column === "email") {
            await api.get(`/users/email/${value}`)
                .then((response) => {
                    if (response.data.users) {
                        setValidEmailOrPhone(false)
                    } else setValidEmailOrPhone(true);
                })
        } else if (column === "username") {
            await api.get(`/users/${value}`)
                .then((response) => {
                    if (response.data.users) {
                        setValidUsername(false)
                    } else setValidUsername(true);
                })
        } else {
            await api.get(`/users/phone/${value}`)
                .then((response) => {
                    if (response.data.users) {
                        setValidEmailOrPhone(false)
                    } else setValidEmailOrPhone(true);
                })
        }
    }, 1000, { 'maxWait': 2000 }), [])

    useEffect(() => {
        setUpdates(updates + 1);

        if (emailOrPhone.length > 0 && fullName.length > 0 && username.length > 0 && password.length > 5) {
            setbuttonStyle("enabled");
        } else if (buttonStyle != "disabled") {
            setbuttonStyle("disabled");
        }
    }, [emailOrPhone, fullName, username, password])

    useEffect(() => {
        if (emailOrPhone.length > 0) {
            if (!UserValidator.emailValidator(emailOrPhone) && UserValidator.phoneValidator(emailOrPhone)) {
                checkUser("phone", emailOrPhone);
            } else if (!UserValidator.phoneValidator(emailOrPhone) && UserValidator.emailValidator(emailOrPhone)) {
                checkUser("email", emailOrPhone);
            } else {
                setValidEmailOrPhone(false)
            }
        } else if (emailOrPhone.length === 0 && updates > 1) setValidEmailOrPhone(false);

    }, [emailOrPhone])

    useEffect(() => {

        if (fullName.length > 0) {
            UserValidator.nameValidator(fullName) ? setValidFullname(true) : setValidFullname(true);
        } else if (fullName.length === 0 && updates > 1) setValidFullname(undefined);

    }, [fullName])

    useEffect(() => {
        if (username.length > 0 && UserValidator.usernameValidator(username)) {
            checkUser("username", username);
        } else if (username.length === 0 && updates > 1) {
            setValidUsername(false);
        }
    }, [username])

    useEffect(() => {
        if (password.length > 0) {
            UserValidator.passwordValidator(password) ? setValidPassword(true) : setValidPassword(false);
        } else if (password.length === 0 && updates > 1) setValidPassword(undefined);
    }, [password])


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (validEmailOrPhone && validFullname && validUsername && validPassword) {
            if (buttonStyle === "enabled") {
                setbuttonStyle("loading");

                const email = UserValidator.emailValidator(emailOrPhone) ? emailOrPhone : null
                const phoneNumber = UserValidator.phoneValidator(emailOrPhone) ? emailOrPhone : null

                api.post("/users", {
                    email: email,
                    phone_number: phoneNumber,
                    full_name: fullName,
                    username: username,
                    password: password
                })
                    .then(function (response) {
                        console.log(response);
                        navigate('/login');
                    })
                    .catch(function (error) {
                        console.log(error);
                        setbuttonStyle("enabled");
                    });
            }
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}></h1>
                <h2 className={styles.subTitle}>Cadastre-se para ver fotos e vídeos dos seus amigos</h2>
                <Button type="submit" style={{ height: 32, marginTop: 8, marginBottom: 8 }} element={
                    <div className={styles.facebookEntry}>
                        <span className={styles.facebookLogo}></span>
                        <a href='#'>Entrar com o Facebook</a>
                    </div>
                } />

                <AlternativeSeparator />

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input value={emailOrPhone} name="emailOrPhone" placeholder="Número de celular ou email"
                        onChange={(e) => setEmailOrPhone((e.target as HTMLTextAreaElement).value)}
                        statusType={validEmailOrPhone != undefined ? validEmailOrPhone ? "valid" : "error" : undefined} />

                    <Input value={fullName} name="fullName" placeholder="Nome completo"
                        onChange={(e) => setFullName((e.target as HTMLTextAreaElement).value)}
                        statusType={validFullname != undefined ? validFullname ? "valid" : "error" : undefined} />

                    <Input value={username} name="username" placeholder="Nome de usuário"
                        onChange={(e) => setUsername((e.target as HTMLTextAreaElement).value)}
                        statusReload={generatedUsername.length > 0} statusType={validUsername != undefined ? validUsername ? "valid" : "error" : undefined} />

                    <Input value={password} name="password" placeholder="Senha" type="password"
                        onChange={(e) => setPassword((e.target as HTMLTextAreaElement).value)}
                        statusType={validPassword != undefined ? validPassword ? "valid" : "error" : undefined} />

                    <Button type="submit" value="Cadastre-se" buttonStyle={buttonStyle} />

                    <p className={styles.postscript}>
                        Ao se cadastrar, você concorda com nossos <a>Termos, Política de Dados e Política de Cookies</a>.
                    </p>
                </form>
            </div>

            <AlternativeActionContainer text="Tem uma conta?" sugestedAction="Conecte-se" actionRoute="/login" containerStyles={{ paddingTop: 10, paddingBottom: 10 }} subContainerStyles={{ margin: 0 }} />

            <GetApp />
        </div>
    )
}

export default Register;
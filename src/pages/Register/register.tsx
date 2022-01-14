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

interface SpanProps {
    visible: boolean,
    value: string
}

interface ValidProps {
    valid: boolean,
    alreadyUsed?: boolean
}

const Register: React.FC = () => {
    const [buttonStyle, setbuttonStyle] = useState<string>("disabled");
    const [generatedUsername, setGeneratedUsername] = useState<string>("");

    const [updates, setUpdates] = useState<number>(0);

    const [spanVisible, setSpanVisible] = useState<SpanProps>();

    const [emailOrPhone, setEmailOrPhone] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [validEmail, setValidEmail] = useState<ValidProps>();
    const [validPhone, setValidPhone] = useState<ValidProps>();
    const [validFullname, setValidFullname] = useState<ValidProps>();
    const [validUsername, setValidUsername] = useState<ValidProps>();
    const [validPassword, setValidPassword] = useState<ValidProps>();

    const [count, setCount] = useState<number>(0);

    const navigate = useNavigate();

    const checkUser = useCallback(_debounce(async (column, value) => {
        console.log("fazendo consulta")
        setCount(count + 1);
        console.log("debouncer:", count)

        if (column === "emailOrPhone") {

            const emailValid = UserValidator.emailValidator(value);
            const phoneValid = UserValidator.phoneValidator(value);
            if (!emailValid && phoneValid) {
                await api.get(`/users/phone/${value}`)
                    .then((response) => {
                        if (response.data.users) {
                            setValidPhone({ valid: true, alreadyUsed: true })
                        } else setValidPhone({ valid: true, alreadyUsed: false });
                    })
            } else if (!phoneValid && emailValid) {
                await api.get(`/users/email/${value}`)
                    .then((response) => {
                        console.log(response.data)
                        if (response.data.users) {
                            setValidEmail({ valid: true, alreadyUsed: true })
                        } else setValidEmail({ valid: true, alreadyUsed: false });
                    })
            } else {
                setValidPhone({ valid: false });
                setValidEmail({ valid: false });
            }

        } else if (column === "username") {
            await api.get(`/users/${value}`)
                .then((response) => {
                    if (response.data.users) {
                        setValidUsername({ valid: true, alreadyUsed: true })
                    } else {
                        setValidUsername({ valid: true, alreadyUsed: false });
                    }
                })
        }
    }, 1000, { 'maxWait': 2000 }), [])

    useEffect(() => {
        setUpdates(updates + 1);

        if (emailOrPhone.length > 0 && fullName.length > 0 && username.length > 0 && password.length > 5) {
            setbuttonStyle("enabled");
        } else if (buttonStyle !== "disabled") {
            setbuttonStyle("disabled");
        }
    }, [emailOrPhone, fullName, username, password])

    useEffect(() => {
        if (emailOrPhone.length > 0) {
            checkUser("emailOrPhone", emailOrPhone);
        } else if (emailOrPhone.length === 0 && updates > 1) {
            setValidPhone({ valid: false });
            setValidEmail({ valid: false });
        }

    }, [emailOrPhone])

    useEffect(() => {
        if (fullName.length > 0) {
            UserValidator.nameValidator(fullName) ? setValidFullname({ valid: true }) : setValidFullname({ valid: false });
        } else if (fullName.length === 0 && updates > 1) setValidFullname(undefined);

    }, [fullName])

    useEffect(() => {
        if (username.length > 0 && UserValidator.usernameValidator(username)) {
            checkUser("username", username);
        } else if (username.length === 0 && updates > 1) {
            setValidUsername({ valid: false });
        }
    }, [username])

    useEffect(() => {
        if (password.length > 0) {
            UserValidator.passwordValidator(password) ? setValidPassword({ valid: true }) : setValidPassword({ valid: true });
        } else if (password.length === 0 && updates > 1) setValidPassword(undefined);
    }, [password])


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (buttonStyle === "enabled") {

            if (validUsername?.alreadyUsed) {
                setSpanVisible({ visible: true, value: "Esse nome de usuário não está disponível." })
            }

            else if (!validEmail?.valid) {
                setSpanVisible({ visible: true, value: "Insira um endereço de email válido." })

            }

            else if (validEmail?.alreadyUsed || validPhone?.alreadyUsed) {
                setSpanVisible({ visible: true, value: `Outra conta está usando ${emailOrPhone}.` })
            }

            else if (validPhone?.alreadyUsed) {
                setSpanVisible({ visible: true, value: "Parece que seu número de telefone está incorreto. Insira o número completo, incluindo o código de área." })
            }

            else if (!validFullname?.valid) {
                setSpanVisible({ visible: true, value: "Insira um nome com menos de 30 caracteres." })
            }

            else if ((validEmail?.valid || validPhone?.valid) && validFullname?.valid && validUsername?.valid && validPassword?.valid) {
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
                        statusType={validEmail === undefined || validPhone === undefined ? undefined :
                            validPhone?.valid && !validPhone.alreadyUsed ? "valid" :
                                validEmail?.valid && !validEmail.alreadyUsed ? "valid" :
                                    "error"
                        } />

                    <Input value={fullName} name="fullName" placeholder="Nome completo"
                        onChange={(e) => setFullName((e.target as HTMLTextAreaElement).value)}
                        statusType={
                            validFullname === undefined ? undefined
                                : validFullname?.valid && updates > 1 ? "valid"
                                    : updates > 1 ? "error" : undefined
                        } />

                    <Input value={username} name="username" placeholder="Nome de usuário"
                        onChange={(e) => setUsername((e.target as HTMLTextAreaElement).value)}
                        statusReload={generatedUsername.length > 0}
                        statusType={validUsername === undefined ? undefined :
                            validUsername?.valid && !validUsername.alreadyUsed ? "valid" :
                                "error"
                        } />

                    <Input value={password} name="password" placeholder="Senha" type="password"
                        onChange={(e) => setPassword((e.target as HTMLTextAreaElement).value)}
                        statusType={
                            validPassword?.valid && updates > 1 ?
                                "valid" : password?.length > 0 && updates > 1 ? "error" : undefined
                        } />

                    <Button type="submit" value="Cadastre-se" buttonStyle={buttonStyle} />

                    {spanVisible?.visible ? (
                        <div className="warningContainer">
                            <span className="spanWarning">{spanVisible.value}</span>

                        </div>
                    ) : (
                        <></>
                    )}

                    <p className={styles.postscript}>
                        Ao se cadastrar, você concorda com nossos <a>Termos, Política de Dados e Política de Cookies</a>.
                    </p>
                </form>
            </div>

            <AlternativeActionContainer text="Tem uma conta?" sugestedAction="Conecte-se" actionRoute="/login" containerStyles={{ paddingTop: 10, paddingBottom: 10 }} subContainerStyles={{ margin: 0 }} />

            <GetApp />
        </div >
    )
}

const mapStateToProps = () => ({

});

export default Register;
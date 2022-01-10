import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../../components/Input';
import Button from '../../components/Button';
import GetApp from '../../components/GetAppContainer';
import AlternativeActionContainer from '../../components/AlternativeActionContainer';
import AlternativeSeparator from '../../components/AlternativeSeparatorContainer';

import styles from './register.module.scss';

const Register: React.FC = () => {
    const [buttonStyle, setbuttonStyle] = useState<string>("disabled");

    const [emailOrPhone, setEmailOrPhone] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (emailOrPhone.length > 0 && fullName.length > 0 && username.length > 0 && password.length > 5) {
            setbuttonStyle("enabled");
        } else {
            if (buttonStyle != "disabled") {
                setbuttonStyle("disabled");
            }
        }
    }, [emailOrPhone, fullName, username, password])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setbuttonStyle("loading");
        
        axios.post("http://10.0.0.105:3333/users", {
            email: emailOrPhone,
            phone_number: phone,
            full_name: fullName,
            username: username,
            password: password
        })
        .then(function (response) {
            console.log(response);
            navigate('/login');
            setbuttonStyle("enabled");
          })
          .catch(function (error) {
            console.log(error);
            setbuttonStyle("enabled");
          });

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
                    <Input value={emailOrPhone} name="emailOrPhone" placeholder="Email" onChange={(e) => setEmailOrPhone((e.target as HTMLTextAreaElement).value)} />
                    <Input value={phone} name="phone" placeholder="Número do celular" onChange={(e) => setPhone((e.target as HTMLTextAreaElement).value)} />
                    <Input value={fullName} name="fullName" placeholder="Nome completo" onChange={(e) => setFullName((e.target as HTMLTextAreaElement).value)} />
                    <Input value={username} name="username" placeholder="Nome de usuário" onChange={(e) => setUsername((e.target as HTMLTextAreaElement).value)} />
                    <Input value={password} name="password" placeholder="Senha" type="password" onChange={(e) => setPassword((e.target as HTMLTextAreaElement).value)} />
                    <Button type="submit" value="Cadastre-se" buttonStyle={buttonStyle}/>

                    <p className={styles.postscript}>
                        Ao se cadastrar, você concorda com nossos <a>Termos, Política de Dados e Política de Cookies</a>.
                    </p>
                </form>
            </div>

            <AlternativeActionContainer text="Tem uma conta?" sugestedAction="Conecte-se" actionRoute="/login" containerStyles={{paddingTop: 10, paddingBottom: 10}} subContainerStyles={{margin: 0}}/>

            <GetApp />
        </div>
    )
}

export default Register;
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./registrationForm.module.css";
import openedEye from "../../../../assets/icons/mng_password_show_icon.png";
import arrow from "../../../../assets/icons/checkbox_true_icon.png";

import AuthButton from "../../../ui/buttons/AuthButton/AuthButton";
import InputBlock from "../../../ui/inputs/InputBlock/InputBlock";
import { useUserStore } from "@/libs/store/useStore";
import LineMessage from "@/components/ui/popups/LineMessage/LineMessage";
import FullScreenMessage from "@/components/ui/popups/FullScreenMessage/FullScreenMessage";
import { 
    checkEmail, 
    checkPasswordLength, 
    passwordEntryVerification 
} from "@/libs/services/checkers";


const RegistrationForm = (): React.ReactNode | Promise<React.ReactNode> => {

    const { isLoading, isAuth, isError, registration } = useUserStore();

    const [name, setName] = useState<string>("");
    const [errorName, setErrorName] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorConfirm, setErrorConfirm] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<"password" | "text">("password");
    const [saveData, setSaveData] = useState<boolean>(true);

    useEffect(() => {
        if(isAuth.length > 10) { 
            setTimeout(() => {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            }, 2000);
        } 
    }, [isAuth])

    const hiddenPassword = (): void => {
        if (showPassword === "password") { 
            setShowPassword("text");
        } else { 
            setShowPassword("password"); 
        }
    }

    const sendData = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const verificatedName = name.replace(/[^а-яїa-z0-9]/ig, "");
        setName(verificatedName);
        if (verificatedName.length === 0 || verificatedName.length < 2 || verificatedName.length > 32) {
            setErrorName(true);
            setTimeout(() => setErrorName(false), 5000)
            return; 
        }
        const validateEmail = checkEmail(email);
        if (!validateEmail) {
            setErrorEmail(true);
            setTimeout(() => setErrorEmail(false), 5000)
            return; 
        }
        const validatePassword = checkPasswordLength(password);
        if (!validatePassword) {
            setErrorPassword(true);
            setTimeout(() => setErrorPassword(false), 5000)
            return; 
        }
        if (password !== confirmPassword) {
            setErrorConfirm(true);
            setTimeout(() => setErrorConfirm(false), 5000)
            return; 
        }
        await registration({name, email, password, saveData});
    }
 
    return (
        <form className={styles.form} onSubmit={(e) => sendData(e)}>
            <h2 className={styles.title}>Реєстрація</h2>

            <div className={styles.input_cover}>
                <InputBlock 
                    labelName="name"
                    labelText="Iм'я"
                    id="name"
                    type="text"
                    value={name}
                    setChange={setName}
                    placeholder="Ваше iм'я" 
                />
                {errorName && 
                    <LineMessage
                        text="Ім'я має складатися мінімум із двох літер" 
                        location="left" 
                    />
                }
            </div>

            <div className={styles.input_cover}>
                <InputBlock 
                    labelName="email"
                    labelText="E-mail"
                    id="email"
                    type="text"
                    value={email}
                    setChange={setEmail}
                    placeholder="example@gmail.com" 
                />
                {errorEmail && 
                    <LineMessage
                        text="Невалідна поштова адреса" 
                        location="left" 
                    />
                }
            </div>
          
            <div className={styles.input_wrap}>
                <label className={styles.label} htmlFor="password">Пароль</label>
                <div className={styles.inp_wrap}>
                <input 
                    className={styles.inp}  
                    id="password" 
                    type={showPassword} 
                    value={password} 
                    onChange={e => passwordEntryVerification(e.target.value, setPassword)}
                    placeholder="Мінімально 8 символів"
                />
                <div className={styles.eye} onClick={hiddenPassword}>
                    <Image src={openedEye} alt="eye" />
                    {showPassword === "text" && <div className={styles.eye_line}></div>}
                </div>
                </div>
                {errorPassword && 
                    <LineMessage 
                        text="Пароль має бути від 8 до 32 символів" 
                        location="left" 
                    />
                }
            </div>
            <div className={styles.input_wrap}>
                <label className={styles.label} htmlFor="confirm">Підтвердьте пароль</label>
                <div className={styles.inp_wrap}>
                    <input 
                        className={styles.inp}  
                        id="confirm" type={showPassword} 
                        value={confirmPassword} 
                        onChange={e => passwordEntryVerification(e.target.value, setConfirmPassword)}
                        placeholder="Підтвердження пароля"
                    />
                    <div className={styles.eye} onClick={hiddenPassword}>
                        <Image src={openedEye} alt="eye" />
                        {showPassword === "text" && <div className={styles.eye_line}></div>}
                    </div>
                </div>
                {errorConfirm && 
                    <LineMessage
                        text="Пароль та підтвердження не збігаються" 
                        location="left" 
                    />
                }
            </div>
            <div className={`${styles.input_wrap} ${styles.checkbox_wrap}`} onClick={() => setSaveData(!saveData)}>
                <div className={styles.checkbox}>
                    {saveData && 
                        <Image src={arrow} alt="confirm"/>
                    }
                </div>
                <h3 className={styles.label}>Запам’ятати дані</h3>
                {!saveData && 
                    <LineMessage 
                        text="Після входу токен доступу буде анульовано через 20 хвилин" 
                        location="left" 
                    />
                }
            </div>
            <p className={styles.text_small}>© 2022 Horizon UI. All Rights Reserved. Made with love by Simmmple!</p>

            <div className={styles.submit}>
                <AuthButton disabled={isLoading} text="Зареєструватися"/>
            </div>

            {isAuth.length > 10 && 
                <FullScreenMessage 
                    text="На пошту надіслано посилання для активації" 
                    value="success"
                />
            }

            {isError.length > 0 && 
                <FullScreenMessage 
                    text={isError}
                />
            }
        </form>
    );
};

export default RegistrationForm;
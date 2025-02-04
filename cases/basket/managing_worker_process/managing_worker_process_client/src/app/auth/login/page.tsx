import { ReactNode } from "react";

import styles from "./loginPage.module.css";

import AuthBlock from "@/components/submodules/AuthBlock/AuthBlock";
import BackPanel from "@/components/submodules/BackPanel/BackPanel";
import MainLogo from "@/components/submodules/MainLogo/MainLogo";
import LoginForm from "@/components/modules/forms/LoginForm/LoginForm";


const LoginPage = (): ReactNode => {
    return (
        <div className={styles.main}>
            <AuthBlock>
                <BackPanel />
                <LoginForm />
                <MainLogo />
            </AuthBlock>
        </div>
    );
};

export default LoginPage;
import { ReactNode } from "react";

import styles from "./registrationPage.module.css";

import AuthBlock from "@/components/submodules/AuthBlock/AuthBlock";
import BackPanel from "@/components/submodules/BackPanel/BackPanel";
import RegistrationForm from "@/components/modules/forms/RegistrationForm/RegistrationForm";
import MainLogo from "@/components/submodules/MainLogo/MainLogo";


const RegistrationPage = (): ReactNode => {
 
  return (
    <div className={styles.main}>
      <AuthBlock>
        <BackPanel />
        <RegistrationForm />
        <MainLogo />
      </AuthBlock> 
    </div>
  );
}

export default RegistrationPage;

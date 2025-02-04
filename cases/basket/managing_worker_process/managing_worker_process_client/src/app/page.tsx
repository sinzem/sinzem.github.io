import React from "react";

import styles from "./styles/app.module.css";

import MainLogo from "@/components/submodules/MainLogo/MainLogo";
import BackPanel from "@/components/submodules/BackPanel/BackPanel";
import AuthButtonsBlock from "@/components/submodules/AuthButtonsBlock/AuthButtonsBlock";
import AuthBlock from "@/components/submodules/AuthBlock/AuthBlock";



export default async function Home() {
 
  return (
    <main className={styles.main}>
      <AuthBlock>
        <BackPanel action={true} />
        <AuthButtonsBlock />
        <MainLogo action={true} />
      </AuthBlock>
    </main>
  );
}

import React, { ReactNode } from "react";
import Image from "next/image";

import styles from "./mainLogo.module.css";
import Logo from "../../../assets/icons/Logo_icon_big.png";

const MainLogo = ({action = false}: {action?: boolean}): ReactNode | Promise<ReactNode> => {
    return (
        <div>
            <div className={!action ? `${styles.logo}` : `${styles.logo} ${styles.logo_animation}`}>
                <div className={styles.img_wrap}>
                    <Image className={styles.img} src={Logo} alt="logo" priority={true} ></Image>
                </div>
                <h1 className={styles.title}>JP Marketing Group</h1>
            </div>
        </div>
    );
};

export default MainLogo;
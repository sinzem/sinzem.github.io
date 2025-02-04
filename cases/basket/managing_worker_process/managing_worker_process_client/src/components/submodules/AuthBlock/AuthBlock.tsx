import React, { ReactNode } from 'react';

import styles from "./AuthBlock.module.css";

import LoadingSpinner from "@/components/ui/spinners/LoadingSpinner/LoadingSpinner";


const AuthBlock = ({children}: {children: ReactNode}):  ReactNode | Promise<ReactNode> => {

    return (
        <div className={styles.auth_block}>
            <div className={styles.auth_wrap}>
                {children}
            </div>
            <LoadingSpinner />
        </div>
    );
};

export default AuthBlock;
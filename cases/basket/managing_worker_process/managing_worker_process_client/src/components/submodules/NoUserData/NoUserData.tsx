import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import styles from "./noUserData.module.css";
import Logo from "../../../assets/icons/Logo_icon_big.png";

import ActionButton from '@/components/ui/buttons/ActionButton/ActionButton';

const NoUserData = () => {
    return (
        <div className={styles.page_wrapper}>
                <div className={styles.not_user_wrap}>
                    <Image src={Logo} alt="logo" />
                    <h2>Дані користувача не знайдено. Зареєструйтесь або зайдіть в обліковий запис</h2> 
                    <Link href="/">
                        <ActionButton text="На головну" size="big" />
                    </Link>
                </div>
            </div>
    );
};

export default NoUserData;
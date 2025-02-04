"use client";

import { ReactNode } from "react";
import Image from "next/image";

import styles from "./changePhoto.module.css";

import { useUserStore } from "@/libs/store/useStore";
import ActionButton from "@/components/ui/buttons/ActionButton/ActionButton";
import instead from "../../../../assets/pictures/instead_photo.png";

const ChangePhoto = (): ReactNode | Promise<ReactNode> => {

    const {user} = useUserStore();

    if (user && !user.photo) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.popup}>
                    <form>
                        <h2>Зображення профілю</h2>
                        <Image src={instead} alt="place for photo"/>
                        <input type="file" />
                        <h3>Перетягніть фото сюди</h3>
                        <h4>-або-</h4>
                        <ActionButton text="Завантажити"/>
                    </form>
                </div>
            </div>
        )
    }
};

export default ChangePhoto;
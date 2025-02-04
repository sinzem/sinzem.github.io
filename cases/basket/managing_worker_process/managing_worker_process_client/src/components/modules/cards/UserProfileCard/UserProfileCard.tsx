import { ReactNode, useState } from "react";
import Image from "next/image";

import styles from "./userProfileCard.module.css";
import instead from "../../../../assets/pictures/instead_photo.png";

import { useUserStore } from "@/libs/store/useStore";
import ActionButton from "@/components/ui/buttons/ActionButton/ActionButton";
import ChangePhoto from "@/components/ui/popups/ChangePhoto/ChangePhoto";

const UserProfileCard = (): ReactNode | Promise<ReactNode> => {

    const {user, isLoading, logout} = useUserStore();

    const [passwordHidden, setPasswordHidden] = useState(true);
    const [photoChanger, setPhotoChanger] = useState(false);

    if (!user) {
        return (
            <div>
                Error
            </div>
        )
    };

    const passwordNotVisible = user.password.replace(/./g, "*");

    const showPassword = () => {
        setPasswordHidden(!passwordHidden);
    }

    const fromAccount = async () => {
        await logout();
    }

    const addPhoto = () => {
        setPhotoChanger(!photoChanger)
    }

    return (
        <div className={styles.card}>
            <div className={styles.data_block}>
                <div className={styles.row}>
                    <h3 className={styles.label}>Name:</h3>
                    <h3 className={styles.value}>
                        {user.name.length < 20 
                            ? user.name
                            : `${user.name.slice(0, 20)}...`
                        }  
                    </h3>
                </div>
                <div className={styles.row}>
                    <h3 className={styles.label}>Surname:</h3>
                    <h3 className={styles.value}>
                        {!user.surname 
                            ? "Unknown" 
                            : user.surname.length < 20
                            ? user.surname
                            : `${user.surname.slice(0, 20)}...`
                        }
                    </h3>
                </div>
                <div className={styles.row}>
                    <h3 className={styles.label}>Tel num:</h3>
                    <h3 className={styles.value}>
                        {!user.phone 
                            ? "Unknown" 
                            :  `${user.phone.slice(0, 3)}
                             (${user.phone.slice(3, 6)})
                              ${user.phone.slice(6, 9)}
                               ${user.phone.slice(9, 11)}
                                ${user.phone.slice(11)}`
                        }
                    </h3>
                </div>
                <div className={styles.row}>
                    <h3 className={styles.label}>Email:</h3>
                    <h3 className={styles.value}>
                        {user.email.length < 20 
                            ? user.email
                            : `${user.email.slice(0, 20)}...`
                        }
                    </h3>
                </div>
                <div className={styles.row}>
                    <h3 className={styles.label}>password:</h3>
                    <h3 className={`${styles.value} ${styles.password}`} onClick={showPassword}>
                        {passwordHidden 
                            ? passwordNotVisible
                            : user.password.length < 20
                            ? user.password
                            : `${user.password.slice(0, 20)}...`
                        }
                    </h3>
                </div>
            </div>
            <div className={styles.button_block}>
                <ActionButton disabled={isLoading} text="Редагувати"/>
                <ActionButton disabled={isLoading} text="Видалити"/>
                <ActionButton action={fromAccount} disabled={isLoading} text="Вихід"/>
            </div>
            <div className={styles.photo_block} onClick={addPhoto}>
                {user.photo 
                    ? <Image src={user.photo} alt="user photo"/>
                    : <>
                        <Image src={instead} alt="place for photo"/>
                        <p>Додати</p>
                        <p>фото</p>
                    </>
                }
            </div>
            {photoChanger &&
                <ChangePhoto />
            }
        </div>
    );
};

export default UserProfileCard;
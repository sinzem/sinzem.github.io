"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import styles from "./aside.module.css";
import logo from "../../../assets/icons/mng_logo_middle_icon.png";
import home from "../../../assets/icons/mng_main_page_white_icon.png";
import face from "../../../assets/icons/ui_profile_icon_icon.png";
import faces from "../../../assets/icons/ui_users_icon.png";
import offer from "../../../assets/icons/ui_offers_icon.png";
import support from "../../../assets/icons/ui_support_icon.png";

import { useUserStore } from "@/libs/store/useStore";
import { IPageName } from "@/libs/types/pages/pageName";
import MenuItem from "@/components/ui/MenuItem/MenuItem";

const Aside = ({
    activePage, 
    setActivePage
}: {
    activePage: IPageName, 
    setActivePage: (e: React.MouseEvent<HTMLDivElement>) => void,
}): ReactNode | Promise<ReactNode>  => {

    const {user} = useUserStore(); 

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const toMain = () => {
        redirect("/");
    }

    return (
        <aside className={styles.main}>
            <div className={styles.top}>
                <div className={styles.logo_wrap} onClick={toMain}>
                    <div className={styles.img_wrap}>
                        <Image className={styles.logo} src={logo} alt="logo"/>
                    </div>
                    <h2 className={styles.title}>JS Marketing Group</h2>
                </div>  
                <div 
                    className={!showMenu ? styles.hamburger : `${styles.hamburger} ${styles.active}`} 
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <div className={styles.hamburger_line}></div>
                    <div className={styles.hamburger_line}></div>
                    <div className={styles.hamburger_line}></div>
                </div>
            </div>
            <div className={!showMenu ? styles.menu : `${styles.menu} ${styles.show}`}>
                <MenuItem 
                    value={"main"}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    src={home}
                    text={"Головна"} 
                />
                <MenuItem 
                    value={"profile"}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    src={face}
                    text={"Профiль"}
                />
                <MenuItem 
                    value={"action"}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    src={faces}
                    text={user?.role === "MANAGER" ? "Користувачi" : "Офери у роботi"}
                />
                <MenuItem 
                    value={"offers"}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    src={offer}
                    text={"Офери"}
                />
                  <MenuItem 
                    value={"support"}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    src={support}
                    text={"Технiчна пiдтримка"}
                />
            </div>
            <div className={showMenu ? styles.backpanel : `${styles.backpanel} ${styles.backpanel_hidden}`}></div>
        </aside>
    );
};

export default Aside;
import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./menuItem.module.css";
import { IPageName } from "@/libs/types/pages/pageName";


const MenuItem = ({
    value,
    activePage,
    setActivePage,
    src,
    text
}: {
    value: IPageName,
    activePage: IPageName,
    setActivePage: (e: React.MouseEvent<HTMLDivElement>) => void,
    src: StaticImageData,
    text: string
}): ReactNode | Promise<ReactNode> => {
    return (
        <div 
            data-value={value} 
            className={activePage === value ? `${styles.item} ${styles.bright}`: styles.item}
            onClick={(e) => setActivePage(e)}
        >
        <div className={styles.img_wrap}>
            <Image src={src} alt={`to ${value} page`}/>  
        </div>
        <h3 className={styles.title}>{text}</h3>
    </div>
    );
};

export default MenuItem;
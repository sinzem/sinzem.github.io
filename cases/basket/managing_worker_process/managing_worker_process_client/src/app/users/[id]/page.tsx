"use client"

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import styles from "./user.module.css";

import { useUserStore } from "@/libs/store/useStore";
import Aside from "@/components/modules/Aside/Aside";
import Profile from "@/components/pages/Profile/Profile";
import { IPageName } from "@/libs/types/pages/pageName";
import LoadingSpinner from "@/components/ui/spinners/LoadingSpinner/LoadingSpinner";

export default function UserPage(): ReactNode {

    const params = useParams();
    const id = params?.id;

    const { getUser} = useUserStore();

    const [activePage, setActivePage] = useState<IPageName>("profile");

    useEffect(() => {
        if (id && typeof id === "string") {
            getUser(id);
        }
    }, [getUser, id])
 
    const changeActivePage = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) e.stopPropagation();
              
        const value = e.currentTarget.dataset.value
        if (value && value !== activePage) setActivePage(value as IPageName);
    }, [activePage]);
    
    return (
        <div className={styles.main}>
            <Aside activePage={activePage} setActivePage={changeActivePage} />
            {activePage === "profile" && <Profile />} 
            <LoadingSpinner />
        </div>
    )
}






"use client";

import { ReactNode } from "react";
// import { useEffect, useState } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

import styles from "./loadingSpinner.module.css";
import spinner from "../../../../assets/gif/103.gif";

import { useUserStore } from '@/libs/store/useStore';


const LoadingSpinner = (): ReactNode | Promise<ReactNode> => {

    const {isLoading} = useUserStore();

    // const pathname = usePathname();
    // const searchParams = useSearchParams();
    // const [isNavigating, setIsNavigating] = useState(false)


    // useEffect(() => {
    //     setIsNavigating(true)
    //     const timeout = setTimeout(() => setIsNavigating(false), 500)
    //     return () => clearTimeout(timeout)
    //   }, [pathname, searchParams])

    
    if (isLoading  /* || isNavigating */ ) {
        return (
            <div className={styles.spinner_wrap}>
                <Image className={styles.spinner} src={spinner} alt="loading..."/>
            </div>
        );
    }
   
};

export default LoadingSpinner;
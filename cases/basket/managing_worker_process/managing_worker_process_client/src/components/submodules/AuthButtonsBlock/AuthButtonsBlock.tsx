"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
// import { auth0 } from "../../lib/auth0";

import styles from "./authButtonsBlock.module.css";

import AuthButton from "../../ui/buttons/AuthButton/AuthButton";

const AuthButtonsBlock = /* async */ (): ReactNode | Promise<ReactNode> => {

    // const session = await auth0.getSession();
    // console.log(session);

    // if (!session) {
    //     return (
    //         <div className={styles.form_block}>
    //             <div className={styles.wrap}>
    //                 <a href="/auth/login?screen_hint=signup">
    //                     <AuthButton text="Реєстрація"/>
    //                 </a>
    //                 <a href="/auth/login">
    //                     <AuthButton text="Акаунт"/>
    //                 </a>
    //             </div>
    //         </div>
    //     );
    // }

    // return (
    //     <div className={styles.form_block}>
    //         <div className={styles.wrap}>
    //             <h1>Welcome, {session.user.name}!</h1>
    //             <img src={session.user.picture} alt="user photo" />
    //             <p>
    //                 <a href="/auth/logout">
    //                     <AuthButton text="Logout"/>
    //                 </a>
    //             </p> 
    //         </div>
    //     </div>
        
    // );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [])

    const click = () => {
        setLoading(!loading);
    }

    return (
        <div className={styles.form_block}>
            <div className={styles.wrap}>
                <Link href="auth/registration">
                    <AuthButton action={click} disabled={loading} text="Реєстрація"/>
                </Link>
                <Link href="auth/login">
                    <AuthButton action={click} disabled={loading} text="Акаунт"/>
                </Link>
            </div>
        </div>
    );
};

export default AuthButtonsBlock;
// ===============================================================================
// "use client";
// import Link from "next/link";

// import styles from "./authButtonsBlock.module.css";

// import AuthButton from "../../ui/buttons/AuthButton/AuthButton";
// import { ReactNode, useState } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import LoadingSpinner from "@/ui/spinners/LoadingSpinner/LoadingSpinner";

// const AuthButtonsBlock = (): ReactNode => {

//     // const pathname = usePathname();
//     // const searchParams = useSearchParams();
//     const [isNavigating, setIsNavigating] = useState(false);

//     const cli = () => {

//         setIsNavigating(true)
//     }

//     return (
//         <div className={styles.form_block}>
//             <div className={styles.wrap}>
//                 <Link href="auth/registration">
//                     <AuthButton text="Реєстрація"/>
//                 </Link>
//                 {/* <Link href="auth/login">
//                     <AuthButton text="Акаунт"/>
//                 </Link> */}
//                 <Link href="auth/login">
//                     <button onClick={cli}>Акаунт</button>
//                 </Link>
//                 {
//                     isNavigating && <LoadingSpinner />

//                 }
                
//             </div>
//         </div>
//     );
// };

// export default AuthButtonsBlock;


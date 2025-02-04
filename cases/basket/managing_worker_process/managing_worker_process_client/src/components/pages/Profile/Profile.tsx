import { ReactNode } from "react";

import styles from "./profile.module.css";

import { useUserStore } from "@/libs/store/useStore";
import UserProfileCard from "@/components/modules/cards/UserProfileCard/UserProfileCard";
import NoUserData from "@/components/submodules/NoUserData/NoUserData";
import TopPanel from "@/components/submodules/TopPanel/TopPanel";

const Profile = (): ReactNode | Promise<ReactNode> => {

    const {user/* , isError */} = useUserStore()

    // if (isError) {
    //     return (
    //         <div className={styles.page_wrapper}>
    //             <FullScreenMessage text={isError} position={"right_bottom"}/>
    //         </div>
    //     )
    // }

    if (!user) {
        return (
            <>
                <NoUserData />
            </>
        )
    }
 
    if (user) {
        return (
            <div className={styles.page_wrapper}>
                <TopPanel/>
                <UserProfileCard />
            </div>
        );
    }
};

export default Profile;
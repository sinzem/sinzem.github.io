import { ReactNode } from "react";

import styles from "./topPanel.module.css";

import { useUserStore } from "@/libs/store/useStore";

const TopPanel = (): ReactNode | Promise<ReactNode>  => {
  
    const {user} = useUserStore();

    if (!user) {
        return (
            <div className={styles.panel}></div>
        )
    }

    return (
        <div className={styles.panel}>
            <div className={styles.item}>
                {user.role === "AFFILIATE" && 
                    <>
                        <h3>Кліки</h3>
                        <h2>{user.clicks}</h2>
                    </>
                }
                {user.role === "MANAGER" && 
                    <>
                        <h3>Індекс</h3>
                        <h2>{user.index}</h2>
                    </>
                }
            </div>
            <div className={styles.item}>
                {user.role === "AFFILIATE" && 
                    <>
                        <h3>Холд</h3>
                        <h2>{user.hold}</h2>
                    </>
                }
                {user.role === "MANAGER" && 
                    <>
                        <h3>Зачислення</h3>
                        <h2>{user.profit}</h2>
                    </>
                }
            </div>
            <div className={styles.item}>
            {user.role === "AFFILIATE" && 
                    <>
                        <h3>Нарахування</h3>
                        <h2>{user.profit}</h2>
                    </>
                }
                {user.role === "MANAGER" && 
                    <>
                        <h3>Бюджет</h3>
                        <h2>{user.budget}</h2>
                    </>
                }
                
            </div>
            <div className={styles.item}>
                <h3>Сповіщення</h3>
                <h2>{user.notification}</h2>
            </div>
        </div>
    );
};

export default TopPanel;
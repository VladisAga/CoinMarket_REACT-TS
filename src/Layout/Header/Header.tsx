import { Outlet } from "react-router-dom";
import styles from './Header.module.scss';

const Layout = () => {
    return (
        <div className={styles.generalArea}>
            <section>

            </section>
            <section className={styles.mainArea}>
                <Outlet />
            </section>
        </div>
    )
};

export default Layout;
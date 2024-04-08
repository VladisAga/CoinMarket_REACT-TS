import { Outlet } from "react-router-dom";
import styles from './HeaderAndMain.module.scss';
import Header from "../../components/Header/Header";

const Layout = () => {
    return (
        <div className={styles.generalArea}>
            <Header />
            <section className={styles.mainArea}>
                <Outlet />
            </section>
        </div>
    )
};

export default Layout;
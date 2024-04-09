import { Outlet } from "react-router-dom";
import styles from './HeaderAndMain.module.scss';
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { stateOfLoading } from "../../redux/isLoadingSlice";
import Loader from '../../components/Loader/Loader';

const Layout = () => {
    const isLoading = useSelector(stateOfLoading);
    
    return (
        <div className={styles.generalArea}>
            <Loader isLoading={isLoading} />
            <Header />
            <section className={styles.mainArea}>
                <Outlet />
            </section>
        </div>
    )
};

export default Layout;
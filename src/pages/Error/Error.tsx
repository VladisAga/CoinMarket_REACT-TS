import Button from '../../components/Button/Button';
import styles from './Error.module.scss';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/', {replace: true});
    };

    return (
        <section className={styles.section404}>
            <div>
                <h1>404</h1>
                <p>There is no such page, I'll tell you. <Button onClick={goHome}>Go home</Button> and they will show you the right way there!</p>
            </div>
        </section>
    );
}

export default Error;
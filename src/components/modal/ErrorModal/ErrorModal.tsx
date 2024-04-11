import { Modal } from 'antd';
import { IModalError } from './ErrorModal.props';
import Button from '../../Button/Button';
import styles from './ErrorModal.module.scss';
import { useNavigate } from 'react-router-dom';

const ErrorModal: React.FC<IModalError> = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        setIsOpen(false);
    };

    const goHome = () => {
        navigate('/', { replace: true });
    };

    return (
            <Modal data-test-id='errorModal' centered open={isOpen} onCancel={handleCancel} closeIcon={false} maskClosable={false}>
                <section className={styles.wrongSection}>
                    <p>SOMETHING WENT WRONG &#128577;</p>
                    <p>GO HOME AND TRY AGAIN</p>
                    <Button className={styles.btn} onClick={goHome}>HOME</Button>
                </section>
            </Modal>
    );
}

export default ErrorModal;
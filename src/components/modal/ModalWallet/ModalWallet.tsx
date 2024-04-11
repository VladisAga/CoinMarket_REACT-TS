import { Modal } from 'antd';
import { IModalWallet } from './modalWallet.props';
import { useEffect, useState } from 'react';
import { ICoin } from '../../../types/types';
import CoinInWallet from '../../CoinInWallet/CoinInWallet';
import styles from './ModalWallet.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

const ModalWallet: React.FC<IModalWallet> = ({ isOpen, setIsOpen }) => {
    const [coinInf, setCoinInf] = useState<ICoin[]>([]);
    const [triger, setTriger] = useState(false);
    const windowWidth = useWindowWidth();

    const handleCancel = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const isWallet = localStorage.getItem('wallet');
        if (isWallet) {
            const walletInf = JSON.parse(isWallet);
            setCoinInf(walletInf);
        }
    }, [isOpen, triger]);

    return (
        <>
            <Modal open={isOpen} onCancel={handleCancel}>
                {!coinInf.length
                    ? <p className={styles.modalTopic}>WALLET IS EMPTY</p>
                    : <section>
                        <p className={styles.modalTopic}>Wallet</p>
                        {!(windowWidth < 525) && <div className={styles.walletTopics}>
                            <p className={styles.name}>Name</p>
                            <p className={styles.quantity}>Quantity</p>
                            <p className={styles.totalCost}>Total cost</p>
                        </div>}
                        <ol className={styles.list}>
                            {coinInf.map((value, id) => (
                                <li key={id} className={styles.listElem}>
                                    <CoinInWallet coin={value} id={id} triger={triger} setTriger={setTriger} />
                                </li>
                            ))}
                        </ol>
                    </section>
                }
            </Modal>
        </>
    );
}

export default ModalWallet;
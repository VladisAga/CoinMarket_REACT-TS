import { Modal } from 'antd';
import { IModalBuyCoins } from './ModalBuyCoins.props';
import { toDollar } from '../../../functional/moneyConvertor';
import Input from '../../Input/Input';
import { useState, useRef } from 'react';
import styles from './ModalBuyCoins.module.scss';
import Button from '../../Button/Button';
import { ICoin } from '../../../types/types';

const ModalBuyCoins: React.FC<IModalBuyCoins> = ({ isOpen, setIsOpen, coinInf, img }) => {
    const [value, setValue] = useState<string>('');
    const { priceUsd, name, symbol } = coinInf;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if (!isNaN(Number(newValue))) {
            setValue(newValue);
        }
    };

    const purchasePrice = () => {
        if (value) {
            return +priceUsd * +value;
        }
        return 0;
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const buyCoin = () => {
        if (value) {
            setIsOpen(false);
            const wallet = localStorage.getItem('wallet');
            if (wallet) {
                const walletInf = JSON.parse(wallet);
                const updatedWalletInf = walletInf.map((elem: ICoin) => {
                    if (elem.symbol === symbol) {
                        return {
                            ...elem,
                            coinAmount: +elem.coinAmount! + +value!
                        };
                    }
                    return elem;
                });
                const foundCoin = updatedWalletInf.some((elem: ICoin) => elem.symbol === symbol);
                if (!foundCoin) {
                    updatedWalletInf.push({
                        ...coinInf,
                        coinImg: img,
                        coinAmount: value
                    });
                }
                localStorage.setItem('wallet', JSON.stringify(updatedWalletInf));
            } else {
                const firstPurchase = [{
                    ...coinInf,
                    coinImg: img,
                    coinAmount: value
                }];
                localStorage.setItem('wallet', JSON.stringify(firstPurchase));
            }
            setValue('');
        }
    };

    return (
        <>
            <Modal centered open={isOpen} onCancel={handleCancel}>
                <header className={styles.modalHead}>
                    <div>
                        <img src={img ? img : '/images/coinDefault.png'} alt={symbol} />
                    </div>
                    <h3>{name} <span>{symbol}</span></h3>
                </header>
                <main className={styles.main}>
                    <p>Price: <span>{toDollar.format(+priceUsd)}</span></p>
                    <div>
                        <Input type='text' value={value} onChange={handleChange} placeholder='Amount of coin' />
                    </div>
                    <p>Purchase price: <span>{toDollar.format(purchasePrice())}</span></p>
                </main>
                <footer className={styles.footer}>
                    <Button className={styles.buyBtn} onClick={buyCoin}>Buy</Button>
                </footer>
            </Modal>
        </>
    )
}

export default ModalBuyCoins;
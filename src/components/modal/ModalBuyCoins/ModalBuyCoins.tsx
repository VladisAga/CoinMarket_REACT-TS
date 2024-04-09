import { Modal } from 'antd';
import { IModalBuyCoins } from './ModalBuyCoins.props';
import { toDollar } from '../../../functional/moneyConvertor';
import Input from '../../Input/Input';
import { useState, useEffect } from 'react';
import styles from './ModalBuyCoins.module.scss';
import Button from '../../Button/Button';
import { ICoin } from '../../../types/types';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { setStateOfBoughtTrue, setStateOfBoughtFalse } from '../../../redux/isBought';

const ModalBuyCoins: React.FC<IModalBuyCoins> = ({ isOpen, setIsOpen, coinInf, img }) => {
    const [value, setValue] = useState<string>('');
    const { priceUsd, name, symbol } = coinInf;
    const [purchasePrice, setPurchasePrice] = useState<number>(0);
    const [triger, setTriger] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if (!isNaN(Number(newValue))) {
            setValue(newValue);
        }
    };

    const purchasePriceFunc = () => {
        if (value) {
            setPurchasePrice(+priceUsd * +value);
            return;
        }
        setPurchasePrice(0);
    };

    useEffect(() => {
        purchasePriceFunc();
    }, [value])

    const handleCancel = () => {
        setIsOpen(false);
    };

    const buyCoin = () => {
        if (value && purchasePrice < 100000) {
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
            setTriger(true);
            dispatch(setStateOfBoughtTrue());
            setTimeout(() => {
                setTriger(false);
                dispatch(setStateOfBoughtFalse());
            }, 2000)
            setValue('');
        }
    };

    return (
        <>
            <Modal centered open={isOpen} onCancel={handleCancel} maskClosable={false}>
                <header className={styles.modalHead}>
                    <div>
                        <img src={img ? img : '/images/coinDefault.png'} alt={symbol} />
                    </div>
                    <h3>{name} <span>{symbol}</span></h3>
                </header>
                <main className={styles.main}>
                    <p>Price: <span>{toDollar.format(+priceUsd)}</span></p>
                    <div>
                        <Input type='text' value={value.trim()} onChange={handleChange} placeholder='Amount of coin' />
                    </div>
                    <p>Purchase price: <span>{toDollar.format(purchasePrice)}</span></p>
                    {purchasePrice > 100000 && <span className={cn(styles.warningText, styles.error)}>Exceeded the maximum of $100,000</span>}
                    {triger && <span className={cn(styles.warningText, styles.success)}>The purchase was successful</span>}
                </main>
                <footer className={styles.footer}>
                    <Button className={styles.buyBtn} onClick={buyCoin}>Buy</Button>
                </footer>
            </Modal>
        </>
    )
}

export default ModalBuyCoins;
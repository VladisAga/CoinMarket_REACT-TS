import { useEffect, useState } from "react";
import styles from './Header.module.scss';
import { ICoin } from "../../types/types";
import { toDollar } from '../../functional/moneyConvertor';
import Button from "../Button/Button";
import ModalWallet from "../modal/ModalWallet/ModalWallet";
import { useLazyGetCoinsPriceQuery } from "../../redux/coinApi";
import { formatter } from "../../functional/moneyConvertor";

const Header = () => {
    const [top3, setTop3] = useState<ICoin[]>();
    const [updatedCoinData, setUpdatedCoinData] = useState<ICoin[]>();
    const [oldWaletInf, setOldWalletInf] = useState<ICoin[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getCoinsPrice, { isLoading }] = useLazyGetCoinsPriceQuery();
    const [triger, setTriger] = useState<boolean>(false);
    const [oldPrice, setOldPrice] = useState<number>(0);
    const [newPrice, setNewPrice] = useState<number>(0);

    useEffect(() => {
        const wallet = localStorage.getItem('wallet');
        if (wallet) {
            const walletInf = JSON.parse(wallet);
            setOldWalletInf(walletInf);
            const oldPrice = walletInf.reduce((acc: number, item: ICoin) => acc + (+item.priceUsd * +item.coinAmount!), 0);
            setOldPrice(oldPrice);
            const coinIds = walletInf.map((value: ICoin) => value.id);
            const idsStr = coinIds.join(',');
            getCoinsPrice(idsStr).unwrap()
                .then((data) => {
                    setUpdatedCoinData(data.data);
                    setTriger(!triger);
                })
                .catch(console.error)
        }
    }, []);

    useEffect(() => {
        if (updatedCoinData) {
            const newPrice = updatedCoinData.reduce((acc: number, item: ICoin) => {
                const coinAmount = oldWaletInf!.find((val: ICoin) => val.symbol === item.symbol)?.coinAmount || 0;
                return acc + (+item.priceUsd * +coinAmount);
            }, 0);
            setNewPrice(newPrice);
        }
    }, [triger]);

    useEffect(() => {
        const allCoins = localStorage.getItem('coinsData');
        if (allCoins) {
            const coins = JSON.parse(allCoins);
            setTop3(coins.slice(0, 3));
        }
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const moneyInWallet = () => {
        const number = newPrice - oldPrice;
        const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;
        const formattedNumber = Math.abs(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const formattedPercentageChange = percentageChange.toFixed(2) + '%';
        const formattedNewPrice = toDollar.format(newPrice);
        const sign = number >= 0 ? '+' : '-';
        return `${formattedNewPrice} ${sign} ${formattedNumber} (${formattedPercentageChange})`;
    };
    
    return (
        <>
            <header className={styles.header}>
                <section className={styles.top3}>
                    <h3>TOP 3 COINS</h3>
                    <div className={styles.coins}>
                        {top3 && top3.map((value, id) =>
                            <p key={id}>{value.rank + '.'} {value.symbol}: {toDollar.format(+value.priceUsd)}</p>)
                        }
                    </div>
                </section>
                <section>
                    {moneyInWallet()}
                    <Button onClick={showModal}>Open wallet</Button>
                </section>
            </header>
            <ModalWallet isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    )
}

export default Header;
import { ICoinInWallet } from "./CoinInWallet.props";
import styles from './CoinInWallet.module.scss';
import { Button } from "antd";
import { ICoin } from "../../types/types";
import { formatNumber } from "../../functional/formatNumber";

const CoinInWallet: React.FC<ICoinInWallet> = ({ coin, id: item, triger, setTriger }) => {
    const {  symbol, coinAmount, priceUsd } = coin;

    const deleteCoin = () => {
        const wallet = localStorage.getItem('wallet');
        if (wallet) {
            const walletInf = JSON.parse(wallet);
            const filteredWallet = walletInf.filter((item: ICoin) => item.symbol !== symbol);
            localStorage.setItem('wallet', JSON.stringify(filteredWallet));
            setTriger(!triger);
        }
    };

    return (
        <section className={styles.coin}>
            <div className={styles.imgAndName}>
                <p className={styles.number}>{item + 1}.</p>
                <div>
                <img src={symbol ? `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png` : '/images/coinDefault.png'} alt={symbol} />
                </div>
                <p>{symbol}</p>
            </div>
            <p className={styles.coinAmount}>{coinAmount}</p>
            {coinAmount && <p className={styles.tolalPrice}>${formatNumber(+(+coinAmount * +priceUsd).toFixed(2))}</p>}
            <Button id='deleteCoinBtn' onClick={deleteCoin} className={styles.delete}><img src="./images/trash.png" alt="trash" /></Button>
        </section>
    )
}

export default CoinInWallet;
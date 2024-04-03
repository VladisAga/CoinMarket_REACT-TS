import { useLazyGetCoinsQuery } from '../../redux/coinApi';
import styles from './MainPage.module.scss';
import cn from 'classnames';
import { ICoin } from '../../types/types';
import TableRow from '../../components/TableRow/TableRow';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { CoinDataMap } from '../CoinPage/coinPage.props';

const MainPage = () => {
    const [getCoinData, { isLoading }] = useLazyGetCoinsQuery();
    const [data, setData] = useState<ICoin[]>();
    const [dataForImg, setDataForImg] = useState<string>();
    const [coinDataFotImg, setCoinDataFotImg] = useState<CoinDataMap>();
    const [paginationPage, setPaginationPage] = useState(1);
    const [limit, setLimit] = useState(100);

    const getCoin = (limit: number) => {
        getCoinData(limit).unwrap()
            .then((data) => {
                const last100Coins = data.data.slice(-100);
                setData(last100Coins);
            })
            .catch((error) => console.error(error))
    };

    useEffect(() => {
        getCoin(limit);
    }, [limit]);

    useEffect(() => {
        const symbolArr = data && data.map((value) => value.symbol);
        const symbolString = symbolArr?.join(',');
        setDataForImg(symbolString);
    }, [data]);

    useEffect(() => {
        if (dataForImg) {
            fetchCoinData(dataForImg)
                .then(data => {
                    setCoinDataFotImg(data.data as CoinDataMap);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [dataForImg]);

    const fetchCoinData = async (coin: string) => {
        const response = await fetch(`http://localhost:3001/api/coin/${coin}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    return (
        <div className={styles.mainArea}>
            <section className={styles.sortingSection}></section>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.firstTh}>#</th>
                        <th className={styles.secondTh}>Name</th>
                        <th className={styles.thirdTh}>Price</th>
                        <th className={styles.fourthTh}>Market Cap</th>
                        <th className={styles.fifthTh}>24h %</th>
                        <th className={styles.sixthTh}>ADD</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((value: ICoin, index: number) => (
                        <TableRow
                            key={value.rank}
                            id={index + limit - 100}
                            imgSrc={coinDataFotImg && coinDataFotImg[value.symbol] && coinDataFotImg[value.symbol][0].logo ? coinDataFotImg[value.symbol][0].logo : ''}
                            value={value}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination page={paginationPage} limit={limit} setPage={setPaginationPage} setLimit={setLimit}/>
        </div>
    );
};

export default MainPage;
import { useLazyGetCoinsQuery } from '../../redux/coinApi';
import styles from './MainPage.module.scss';
import cn from 'classnames';
import { ICoin } from '../../types/types';
import TableRow from '../../components/TableRow/TableRow';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { CoinDataMap } from '../CoinPage/coinPage.props';
import SortingSection from '../../components/SortingSection/SortingSection';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [getCoinData, { isLoading }] = useLazyGetCoinsQuery();
    const [data, setData] = useState<ICoin[]>();
    const [dataForImg, setDataForImg] = useState<string>();
    const [coinDataFotImg, setCoinDataFotImg] = useState<CoinDataMap>();
    const [paginationPage, setPaginationPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [triger, setTriger] = useState<boolean>(false);
    const navigate = useNavigate();

    const getCoin = () => {
        getCoinData(null).unwrap()
            .then((data) => {
                const sortedData = data.data.filter((value: ICoin) => +value.priceUsd > 0 && +value.marketCapUsd > 0);
                setData(sortedData);
                setTriger(true);
                localStorage.setItem('coinsData', JSON.stringify(sortedData));
            })
            .catch((error) => console.error(error))
    };

    useEffect(() => {
        getCoin();
    }, []);

    useEffect(() => {
        const symbolArr = data && data.map((value) => value.symbol).slice(0, 549);
        const symbolString = symbolArr?.join(',');
        setDataForImg(symbolString);
    }, [triger]);

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
            <SortingSection tableData={data!} setTableData={setData} />
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
                    {data && data.map((value: ICoin) => (
                        <TableRow
                            key={value.rank}
                            id={limit - 100}
                            imgSrc={coinDataFotImg && coinDataFotImg[value.symbol] && coinDataFotImg[value.symbol][0].logo ? coinDataFotImg[value.symbol][0].logo : ''}
                            value={value}
                            tableData={data}
                        />
                    )).slice(limit - 100, limit)}
                </tbody>
            </table>
            <Pagination page={paginationPage} dataLength={data!?.length} limit={limit} setPage={setPaginationPage} setLimit={setLimit} />
        </div>
    );
};

export default MainPage;
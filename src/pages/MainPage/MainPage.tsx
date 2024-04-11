import { useLazyGetCoinsQuery } from '../../redux/coinApi';
import styles from './MainPage.module.scss';
import { ICoin } from '../../types/types';
import TableRow from '../../components/TableRow/TableRow';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import SortingSection from '../../components/SortingSection/SortingSection';
import { useDispatch } from 'react-redux';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '../../redux/isLoadingSlice';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const MainPage = () => {
    const [getCoinData, { isLoading }] = useLazyGetCoinsQuery();
    const [data, setData] = useState<ICoin[]>();
    const [paginationPage, setPaginationPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();

    const getCoin = () => {
        getCoinData(900).unwrap()
            .then((data) => {
                const sortedData = data.data.filter((value: ICoin) => +value.priceUsd > 0 && +value.marketCapUsd > 0);
                setData(sortedData);
                localStorage.setItem('coinsData', JSON.stringify(sortedData));
            })
            .catch((error) => console.error(error))
    };

    useEffect(() => {
        getCoin();
    }, []);

    useEffect(() => {
        if (isLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [isLoading, dispatch,]);

    return (
        <div className={styles.mainArea}>
            <SortingSection tableData={data!} setTableData={setData} />
            <table className={styles.table}>
                {!(windowWidth < 750) && <thead>
                    <tr>
                        <th className={styles.firstTh}>#</th>
                        <th className={styles.secondTh}>Name</th>
                        <th className={styles.thirdTh}>Price</th>
                        <th className={styles.fourthTh}>Market Cap</th>
                        <th className={styles.fifthTh}>24h %</th>
                        <th className={styles.sixthTh}>PURCHASE</th>
                    </tr>
                </thead>}
                <tbody>
                    {data && data.map((value: ICoin) => (
                        <TableRow
                            key={value.rank}
                            id={limit - 100}
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
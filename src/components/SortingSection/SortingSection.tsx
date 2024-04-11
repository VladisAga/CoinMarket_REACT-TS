import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import styles from './SortingSection.module.scss';
import { ISortingSection } from './SortingSection.props';
import { ICoin } from '../../types/types';
import Select from '../Select/Select';
import { sortingOptions } from './sortingOptions';
import Input from '../Input/Input';

const SortingSection: React.FC<ISortingSection> = ({ setTableData, tableData }) => {
    const [sortedCoinPrice, setSortedCoinPrice] = useState<string>('');
    const [sortedMarketCap, setSortedMarketCap] = useState<string>('');
    const [sortedPercent, setSortedPercent] = useState<string>('');
    const { coinPrice, marketCap, percent } = sortingOptions;
    const [searchValue, setSearchValue] = useState<string>('');
    const [symbols, setSymbols] = useState<string[]>();

    const sortCoinsPrice = useCallback((keyWord: string, obgKey: keyof ICoin) => {
        setTimeout(() => {
            if (Array.isArray(tableData)) {
                const sortedData = [...tableData];
                if (keyWord === 'ascending') {
                    sortedData.sort((a, b) => +a[obgKey]! - +b[obgKey]!);
                } else if (keyWord === 'descending') {
                    sortedData.sort((a, b) => +b[obgKey]! - +a[obgKey]!);
                }
                setTableData(sortedData);
            }
        }, 0);
    }, [tableData]);

    const searchCoin = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toUpperCase();
        setSearchValue(newValue);
    }, []);

    useEffect(() => {
        if (tableData) {
            const symbolsArr = tableData.map((value) => value.symbol);
            setSymbols(symbolsArr);
        }
    }, [tableData]);

    useEffect(() => {
        sortCoinsPrice(sortedCoinPrice, 'priceUsd');
    }, [sortedCoinPrice]);

    useEffect(() => {
        sortCoinsPrice(sortedMarketCap, 'marketCapUsd');
    }, [sortedMarketCap]);

    useEffect(() => {
        sortCoinsPrice(sortedPercent, 'changePercent24Hr');
    }, [sortedPercent]);

    useEffect(() => {
        if (searchValue.length === 0) {
            setSortedCoinPrice('');
            setSortedMarketCap('');
            setSortedPercent('');
            const initialData = localStorage.getItem('coinsData');
            if (initialData) {
                const parsedData = JSON.parse(initialData);
                if (JSON.stringify(parsedData) !== JSON.stringify(tableData)) {
                    setTableData(parsedData);
                }
            }
        } else if (symbols?.includes(searchValue)) {
            const sortedData = tableData.filter((value) => value.symbol === searchValue);
            if (JSON.stringify(sortedData) !== JSON.stringify(tableData)) {
                setTableData(sortedData);
            }
        }
    }, [searchValue]);

    return (
        <section className={styles.sortingSection}>
            <Select
                value={sortedCoinPrice}
                onChange={setSortedCoinPrice}
                options={coinPrice}
                className={styles.select}
            />
            <Select
                value={sortedMarketCap}
                onChange={setSortedMarketCap}
                options={marketCap}
                className={styles.select}
            />
            <Select
                value={sortedPercent}
                onChange={setSortedPercent}
                options={percent}
                className={styles.select}
            />
            <section className={styles.inputSection}>
                <div className={styles.imgBox}>
                    <img src="/images/loupe.png" alt="loupe" />
                </div>
                <Input placeholder='BTC' id='searchInput' type='text' value={searchValue} onChange={searchCoin} />
            </section>
        </section>
    );
};

export default SortingSection;

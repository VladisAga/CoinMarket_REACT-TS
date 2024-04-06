import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyGetCoinCandleQuery } from "../../redux/coinApi";
import { ICoin } from "../../types/types";
import styles from './CoinPage.module.scss';
import CandlestickChart from "../../components/CandlestickChart/CandlestickChart";
import Button from "../../components/Button/Button";

const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    } else {
        return num.toString();
    }
};

interface IInterval {
    interval: string;
    dataPoints: number;
}

interface IintervalInf {
    '1d'?: IInterval;
    '12h'?: IInterval;
    '1h'?: IInterval;
}

const intervalInf = {
    '1d': {
        interval: 'h1',
        dataPoints: 24
    },
    '12h': {
        interval: 'm30',
        dataPoints: 24
    },
    '1h': {
        interval: 'm1',
        dataPoints: 60
    },
}

const CoinPage = () => {
    const navigate = useNavigate();
    const [getCandleData, { isLoading }] = useLazyGetCoinCandleQuery();
    const [data, setData] = useState<ICoin>();
    const [imgSrc, setImgSrc] = useState<string>();
    const [graphicData, setGraphicData] = useState();
    const [selectValue, setSelectValue] = useState<string>('1d'); const { inf } = useParams();
    const toDollar = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        if (inf) {
            setData(JSON.parse(inf));
        }
    }, [inf]);

    const getGraphicInf = (interval: string, dataPoints: number) => {
        if (data) {
            const imgData = localStorage.getItem('coinImg');
            if (imgData) {
                setImgSrc(imgData);
            }
            getCandleData({ interval: interval, coin: data?.id }).unwrap()
                .then((data) => {
                    setGraphicData(data.data.slice(-dataPoints));
                })
                .catch((error) => console.error(error));
        }
    }

    useEffect(() => {
        getGraphicInf(intervalInf[selectValue as keyof IintervalInf].interval, intervalInf[selectValue as keyof IintervalInf].dataPoints);
    }, [data, getCandleData, selectValue]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        setSelectValue(selectedOption);
    };


    const toHome = () => {
        navigate('/', { replace: true });
    };

    return (
        <>
            <section className={styles.coinSection}>
                {data && (
                    <>
                        <div className={styles.textInf}>
                            <div className={styles.imgAndName}>
                                <div className={styles.imgBox}>
                                    <img src={imgSrc ? imgSrc : '/images/coinDefault.png'} alt={data.id} />
                                </div>
                                <p>{data.name} <span>{data.symbol}</span></p>
                                <section className={styles.selectSection}>
                                    <label htmlFor="select">Time interval</label>
                                    <select id="select" value={selectValue} onChange={handleChange}>
                                        <option value='1d'>1d</option>
                                        <option value="12h">12h</option>
                                        <option value="1h">1h</option>
                                    </select>
                                </section>
                            </div>
                            <div className={styles.topics}>
                                <p><span className={styles.topicName}>Coin rank:</span> {data.rank}</p>
                                <p><span className={styles.topicName}>Price:</span> {toDollar.format(+data!.priceUsd)}</p>
                                <p><span className={styles.topicName}>Market cap:</span> ${formatNumber(+data!.marketCapUsd)}</p>
                                <p><span className={styles.topicName}>Supply:</span> ${formatNumber(+data!.supply)}</p>
                                {+data!.maxSupply !== 0
                                    ? <p><span className={styles.topicName}>Max supply:</span> ${formatNumber(+data!.maxSupply)}</p>
                                    : <p><span className={styles.topicName}>Max supply:</span><span>&#8734;</span> </p>}
                                <Button className={styles.homeBtn} onClick={toHome}>TO MAIN</Button>
                            </div>
                        </div>
                        <div className={styles.graphic}>
                            <CandlestickChart graphicData={graphicData!} coinName={data.id} />
                        </div>
                    </>
                )}
            </section>

        </>
    );
};

export default CoinPage;
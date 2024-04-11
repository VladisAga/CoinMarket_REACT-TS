import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyGetCoinCandleQuery } from "../../redux/coinApi";
import { ICoin } from "../../types/types";
import styles from './CoinPage.module.scss';
import CandlestickChart from "../../components/CandlestickChart/CandlestickChart";
import Button from "../../components/Button/Button";
import { toDollar } from '../../functional/moneyConvertor';
import ModalBuyCoins from "../../components/modal/ModalBuyCoins/ModalBuyCoins";
import { formatNumber } from "../../functional/formatNumber";
import { IintervalInf } from "./coinPage.props";
import { intervalInf } from "./coinInf";
import cn from 'classnames';
import { useDispatch } from "react-redux";
import { setStateOfLoadTrue, setStateOfLoadFalse } from "../../redux/isLoadingSlice";
import ErrorModal from "../../components/modal/ErrorModal/ErrorModal";

const CoinPage = () => {
    const navigate = useNavigate();
    const [getCandleData, { isLoading }] = useLazyGetCoinCandleQuery();
    const [data, setData] = useState<ICoin>();
    const [graphicData, setGraphicData] = useState();
    const [selectValue, setSelectValue] = useState<string>('1d');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isErrorModalOPen, setIsErrorModalOpen] = useState<boolean>(false);
    const { inf } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (inf) {
            setData(JSON.parse(inf));
        }
    }, [inf]);

    const getGraphicInf = (interval: string, dataPoints: number) => {
        if (data) {
            getCandleData({ interval: interval, coin: data?.id }).unwrap()
                .then((data) => {
                    setGraphicData(data.data.slice(-dataPoints));
                })
                .catch(() => setIsErrorModalOpen(true));
        }
    };

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

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (isLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [isLoading, dispatch, getGraphicInf]);

    return (
        <>
            <section id="coinPage" className={styles.coinSection}>
                {data && (
                    <>
                        <div className={styles.textInf}>
                            <div className={styles.imgAndName}>
                                <div className={styles.logoBox}>
                                    <div >
                                        <img src={data.symbol ? `https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png` : '/images/coinDefault.png'} alt={data.symbol} />
                                    </div>
                                    <p>{data.name} <span>{data.symbol}</span></p>
                                </div>
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
                                <p><span className={styles.topicName}>Price:</span> {+data.priceUsd > 0.01 ? toDollar.format(+data.priceUsd) : '$' + parseFloat(data.priceUsd).toFixed(8)}</p>
                                <p><span className={styles.topicName}>Market cap:</span> ${formatNumber(+data!.marketCapUsd)}</p>
                                <p><span className={styles.topicName}>Supply:</span> ${formatNumber(+data!.supply)}</p>
                                {+data!.maxSupply !== 0
                                    ? <p><span className={styles.topicName}>Max supply:</span> ${formatNumber(+data!.maxSupply)}</p>
                                    : <p className={styles.pWintInf}><span className={styles.topicName}>Max supply:</span><span className={styles.infinity}>&infin;</span> </p>}
                                <div className={styles.btnBox}>
                                    <button id='test' style={{position: 'absolute', bottom: '0'}} onClick={() => getGraphicInf('2', 2)}></button>
                                    <Button id='goToMain' className={styles.Btn} onClick={toHome}>TO MAIN</Button>
                                    <Button className={cn(styles.Btn, styles.buyBtn)} onClick={showModal}>BUY</Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.graphic}>
                            <CandlestickChart graphicData={graphicData!} timePeriod={selectValue} />
                        </div>
                    </>
                )}
            </section>
            {data && <ModalBuyCoins setIsOpen={setIsModalOpen} coinInf={data} isOpen={isModalOpen} />}
            <ErrorModal setIsOpen={setIsErrorModalOpen} isOpen={isErrorModalOPen} />
        </>
    );
};

export default CoinPage;
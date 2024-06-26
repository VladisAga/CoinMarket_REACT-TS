import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import styles from './TableRow.module.scss';
import { ITableRow } from './TableRow.props';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import ModalBuyCoins from '../modal/ModalBuyCoins/ModalBuyCoins';
import { toDollar } from '../../functional/moneyConvertor';
import { formatNumber } from '../../functional/formatNumber';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const TableRow: React.FC<ITableRow> = ({ value, id, tableData }) => {
    const rowRef = useRef<HTMLTableRowElement>(null);
    const [rowIndex, setRowIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const { symbol, priceUsd, marketCapUsd, changePercent24Hr } = value;

    useEffect(() => {
        if (rowRef.current) {
            const table = rowRef.current.closest('table');
            if (table) {
                const rows = table.getElementsByTagName('tr');
                const index = Array.from(rows).indexOf(rowRef.current);
                (windowWidth > 750) ? setRowIndex(index) : setRowIndex(index + 1);
            }
        }
    }, [marketCapUsd, priceUsd, tableData]);

    const goToCoinPage = () => {
        navigate(`/coinPage/${encodeURIComponent(JSON.stringify(value))}`, { replace: true });
    };

    const showModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    return (
        <>
            <tr id='coinRow' ref={rowRef} className={styles.row} onClick={goToCoinPage}>
                <td className={styles.secondTd}>
                    <span id={symbol} className={styles.firstTd}>{id + rowIndex}.</span>
                    <img src={symbol ? `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png` : '/images/coinDefault.png'} alt={symbol} />
                    {symbol}
                </td>
                <td id='sorted-element' className={styles.thirdTd}>{+priceUsd > 0.01 ? toDollar.format(+priceUsd) : '$' + parseFloat(priceUsd).toFixed(8)}</td>
                <td className={styles.fourthTd}>${formatNumber(+marketCapUsd)}</td>
                <td className={cn(styles.fifthTd, styles.plus, {
                    [styles.minus]: +changePercent24Hr < 0
                })}>{Math.abs(+changePercent24Hr) > 0.01 ? Math.abs(+changePercent24Hr).toFixed(2) + '%' : Math.abs(+changePercent24Hr).toFixed(4) + '%'}</td>
                <td className={styles.sixthTd}><Button id='buyCoinBtn' className={styles.buyCoinBtn} onClick={showModal}>Buy</Button></td>
            </tr>
            <ModalBuyCoins setIsOpen={setIsModalOpen} coinInf={value} isOpen={isModalOpen} />
        </>
    )
}

export default TableRow;
import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import styles from './TableRow.module.scss';
import { ITableRow } from './TableRow.props';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

const TableRow: React.FC<ITableRow> = ({ value, id, imgSrc, tableData }) => {
    const rowRef = useRef<HTMLTableRowElement>(null);
    const [rowIndex, setRowIndex] = useState<number>(-1);
    const navigate = useNavigate();
    const { symbol, priceUsd, marketCapUsd, changePercent24Hr } = value;
    const toDollar = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        if (rowRef.current) {
            const table = rowRef.current.closest('table');
            if (table) {
                const rows = table.getElementsByTagName('tr');
                const index = Array.from(rows).indexOf(rowRef.current);
                setRowIndex(index);
            }
        }
    }, [marketCapUsd, priceUsd, tableData]);

    const goToCoinPage = () => {
        localStorage.setItem('coinImg', imgSrc);
        navigate(`/coinPage/${encodeURIComponent(JSON.stringify( value ))}`, { replace: true });
    };

    return (
        <>
            {<tr ref={rowRef} className={styles.row} onClick={goToCoinPage}>
                <td className={styles.firstTd}>{id + rowIndex}</td>
                <td className={styles.secondTd}>
                    <img src={imgSrc ? imgSrc : '/images/coinDefault.png'} alt='coin' />
                    {symbol}
                </td>
                <td className={styles.thirdTd}>{+priceUsd > 0.01 ? toDollar.format(+priceUsd) : '$' + parseFloat(priceUsd).toFixed(8)}</td>
                <td className={styles.fourthTd}>{toDollar.format(+marketCapUsd)}</td>
                <td className={cn(styles.fifthTd, styles.plus, {
                    [styles.minus]: +changePercent24Hr < 0
                })}>{Math.abs(+changePercent24Hr) > 0.01 ? Math.abs(+changePercent24Hr).toFixed(2) + '%' : Math.abs(+changePercent24Hr).toFixed(4) + '%'}</td>
                <td className={styles.sixthTd}><Button className={styles.buyCoinBtn}>Buy coin</Button></td>
            </tr>}
        </>
    )
}

export default TableRow;
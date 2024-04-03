import Button from '../Button/Button';
import styles from './TableRow.module.scss';
import { ITableRow } from './TableRow.props';
import cn from 'classnames';

const TableRow: React.FC<ITableRow> = ({ value, id, imgSrc }) => {
    const { symbol, priceUsd, marketCapUsd, changePercent24Hr } = value;
    const toDollar = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <tr className={styles.row}>
            <td className={styles.firstTd}>{id + 1}</td>
            <td className={styles.secondTd}>
                <img src={imgSrc} />
                {symbol}
            </td>
            <td className={styles.thirdTd}>{+priceUsd > 0.01 ? toDollar.format(+priceUsd) : '$' + parseFloat(priceUsd).toFixed(8)}</td>
            <td className={styles.fourthTd}>{toDollar.format(+marketCapUsd)}</td>
            <td className={cn(styles.fifthTd, styles.plus, {
                [styles.minus]: +changePercent24Hr < 0
            })}>{Math.abs(+changePercent24Hr) > 0.01 ? Math.abs(+changePercent24Hr).toFixed(2) + '%' : Math.abs(+changePercent24Hr).toFixed(4) + '%'}</td>
            <td className={styles.sixthTd}><Button className={styles.buyCoinBtn}>Buy coin</Button></td>
        </tr>
    )
}

export default TableRow;
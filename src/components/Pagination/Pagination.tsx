import Button from '../Button/Button';
import styles from './Pagination.module.scss';
import { IPagination } from './Pagination.props';

const Pagination: React.FC<IPagination> = ({ page, setPage, limit, setLimit }) => {
    return (
        <>
            <div className={styles.pagination}>
                {page > 1 && <Button>
                    <span onClick={() => { setPage(page - 1); setLimit(limit - 100) }} className={styles.pagePagination}>&lsaquo; Previous</span>
                </Button>}
                <p><span>{page}</span></p>
                <Button>
                    <span onClick={() => { setPage(page + 1); setLimit(limit + 100) }} className={styles.pagePagination}> Next &rsaquo;</span>
                </Button>
            </div>
        </>
    )
}

export default Pagination;
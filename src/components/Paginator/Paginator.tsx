import React, {useState} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {ForwardOutlined} from '@material-ui/icons';

import {useAppDispatch} from '../../hooks/hooks';
import {setCurrentPage} from '../../redux/slices/notice';

import styles from './Paginator.module.scss';

const Paginator: React.FC<PropsType> = ({currentPage, pageCount, totalNotices}) => {
    const [changePageValue, setChangePageValue] = useState<string>('');
    const totalPages = totalNotices / pageCount;
    const dispatch = useAppDispatch();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage({page: value}));
    };
    const onClickHandler = () => {
        if (+changePageValue < 1 || +changePageValue > totalPages) return;
        dispatch(setCurrentPage({page: +changePageValue}));
        setChangePageValue('');
    };
    return (
        <div className={styles.paginatorBlock}>
            <div className={styles.paginator}>
                <Pagination color='primary'
                            shape='rounded'
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChange}/>
            </div>
            <div className={styles.changePageBlock}>
                <span>Перейти на сторінку</span>
                <p className={styles.inputBlock}>
                    <input value={changePageValue}
                           type='number'
                           onChange={(e) => setChangePageValue(e.currentTarget.value)}
                           className={styles.input}/>
                    <span className={styles.arrowIcon}
                          onClick={onClickHandler}>
                        <ForwardOutlined/>
                    </span>
                </p>
            </div>
            <p className={styles.pageDescription}>
                Сторінка {currentPage} з {totalPages}
            </p>
        </div>
    );
};

type PropsType = {
    currentPage: number
    pageCount: number
    totalNotices: number
}

export default Paginator;

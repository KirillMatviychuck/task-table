import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {FilterList} from '@material-ui/icons';

import EditButton from '../EditButton/EditButton';
import {NoticeType} from '../../db/db';
import Paginator from '../Paginator/Paginator';
import {useAppDispatch} from '../../hooks/hooks';
import {sortTasks} from '../../redux/slices/notice';

import styles from './MainTable.module.scss';

const MainTable: React.FC<PropsType> = ({notices, totalNotices, currentPage, pageCount}) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={styles.table}>
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell className={styles.tableHeadCell} align='left'>Назва</TableCell>
                            <TableCell className={styles.tableHeadCell} align='left'>URL</TableCell>
                            <TableCell className={styles.tableHeadCell} align='left'>Автор</TableCell>
                            <TableCell className={`${styles.tableHeadCell} ${styles.sortCell}`} align='left'
                                       onClick={() => dispatch(sortTasks())}>
                                <div className={styles.sortBlock}>
                                    <span>Створено</span>{<FilterList color='primary' className={styles.sortIcon}/>}
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices.map(notice => {
                            return <TableRow key={notice.id} className={styles.tableRow}>
                                <TableCell className={`${styles.tableCell} ${styles.titleBlock}`} component='th'
                                           scope='row'>
                                    <EditButton userID={notice.id}/>
                                    <span>{notice.title}</span>
                                </TableCell>
                                <TableCell className={styles.tableCell} align='left'>
                                    {notice.url}
                                </TableCell>
                                <TableCell className={styles.tableCell} align='left'>
                                    {notice.author}
                                </TableCell>
                                <TableCell className={styles.tableCell} align='left'>
                                    {notice.createdDate}
                                </TableCell>
                            </TableRow>;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paginator totalNotices={totalNotices} currentPage={currentPage} pageCount={pageCount}/>
        </>
    );
};

type PropsType = {
    notices: NoticeType[]
    currentPage: number
    pageCount: number
    totalNotices: number
}

export default MainTable;

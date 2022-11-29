import React from 'react';
import {Add, Close} from '@material-ui/icons';
import {useNavigate} from 'react-router-dom';

import styles from './AddUserFormHeader.module.scss';

const AddUserFormHeader = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.formHeader}>
            <div className={styles.formHeaderLeft}>
                <Add className={styles.addBtn} color='primary'/>
                <span>Редагувати сутність</span>
            </div>
            <Close className={styles.formHeaderRight} color='disabled' fontSize='small' onClick={() => navigate('/')}/>
        </div>
    );
};

export default AddUserFormHeader;

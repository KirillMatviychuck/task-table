import React from 'react';
import {DeleteOutline, EditOutlined, SaveAltOutlined} from '@material-ui/icons';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch} from '../../hooks/hooks';
import {deleteUser} from '../../redux/slices/notice';

import styles from './Modal.module.scss';


const Modal: React.FC<PropsType> = ({userID}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const deleteUserHandler = (id: string) => dispatch(deleteUser({id}));
    const onEditClickHandler = () => {
        navigate(`/form/${userID}`);
    };
    return (
        <div className={styles.modal}>
            <p className={styles.editorRow}>{<EditOutlined color='primary'/>}
                <span onClick={onEditClickHandler}>Редагувати</span></p>
            <p className={styles.editorRow}>{<SaveAltOutlined color='primary'/>}
                <span>Зберегти як файл</span></p>
            <p className={styles.editorRow} onClick={() => deleteUserHandler(userID)}>{<DeleteOutline color='primary'/>}
                <span>Видалити</span></p>
        </div>
    );
};

type PropsType = {
    userID: string
}

export default Modal;
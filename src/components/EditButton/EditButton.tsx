import React, {useState} from 'react';
import {MoreVert} from '@material-ui/icons';

import Modal from '../Modal/Modal';

import styles from './EditButton.module.scss';

const EditButton: React.FC<PropsType> = ({userID}) => {
    const [activateModal, setActivateModal] = useState(false);

    return (
        <div className={styles.editButton}
             onClick={() => setActivateModal(!activateModal)}
             onBlur={() => setActivateModal(!activateModal)}>
            <MoreVert color={activateModal ? 'primary' : 'disabled'}/>
            {activateModal && <Modal userID={userID}/>}
        </div>
    );
};

type PropsType = {
    userID: string
}

export default EditButton;
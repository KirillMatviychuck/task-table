import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

import AddUserForm from '../AddUserForm/AddUserForm';

import './App.css';
import MainTable from '../MainTable/MainTable';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchNotices} from '../../redux/slices/notice';
import {sortNotices} from '../../db/db';

function App() {
    const dispatch = useAppDispatch();
    const {notices, pageCount, currentPage, totalNotices} = useAppSelector(state => state.notices);

    useEffect(() => {
        dispatch(fetchNotices({notices: sortNotices(currentPage, pageCount)}));
    }, [currentPage]);

    return (
        <div className='App'>
            <Routes>
                <Route path='*' element={<MainTable notices={notices}
                                                    currentPage={currentPage}
                                                    pageCount={pageCount}
                                                    totalNotices={totalNotices}/>}/>
                <Route path='/form/:id' element={<AddUserForm />}/>
            </Routes>
        </div>
    );
}

export default App;

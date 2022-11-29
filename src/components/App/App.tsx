import {useEffect, useState} from 'react';
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
    const getWindowSize = () => window.innerHeight;
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (windowSize >= 940) dispatch(fetchNotices({notices: sortNotices(currentPage, 12)}));
        else if (windowSize >= 836) dispatch(fetchNotices({notices: sortNotices(currentPage, 11)}));
        else if (windowSize >= 807) dispatch(fetchNotices({notices: sortNotices(currentPage, 10)}));
        else if (windowSize >= 744) dispatch(fetchNotices({notices: sortNotices(currentPage, 9)}));
        else if (windowSize >= 682) dispatch(fetchNotices({notices: sortNotices(currentPage, 8)}));
        else if (windowSize >= 613) dispatch(fetchNotices({notices: sortNotices(currentPage, 7)}));
        else if (windowSize >= 551) dispatch(fetchNotices({notices: sortNotices(currentPage, 6)}));
        else dispatch(fetchNotices({notices: sortNotices(currentPage, 5)}));



    }, [currentPage, windowSize]);
    return (
        <div className='App'>
            <Routes>
                <Route path='*' element={<MainTable notices={notices}
                                                    currentPage={currentPage}
                                                    pageCount={pageCount}
                                                    totalNotices={totalNotices}/>}/>
                <Route path='/form/:id' element={<AddUserForm/>}/>
            </Routes>
        </div>
    );
}

export default App;

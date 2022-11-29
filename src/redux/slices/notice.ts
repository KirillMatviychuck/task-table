import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NoticeType} from '../../db/db';



const initialState = {
    notices: [] as NoticeType[],
    currentPage: 1,
    pageCount: 12,
    totalNotices: 120
};

const noticesSlice = createSlice({
    name: 'notices',
    initialState,
    reducers: {
        fetchNotices(state, action: PayloadAction<{notices: NoticeType[]}>) {
            state.notices = action.payload.notices;
        },
        setCurrentPage(state, action: PayloadAction<{page: number}>) {
            state.currentPage = action.payload.page;
        },
        editTask(
            state,
            action: PayloadAction<{id: string, title: string, name: string, phone: string, email: string}>
        ) {
            const index = state.notices.findIndex(task => task.id === action.payload.id);
            const date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
            state.notices[index].title = action.payload.title;
            state.notices[index].author = action.payload.name;
            state.notices[index].createdDate = date;
        },
        deleteUser(state, action: PayloadAction<{id: string}>) {
            const index = state.notices.findIndex(item => item.id === action.payload.id);
            state.notices.splice(index, 1);
        },
        sortTasks(state) {
            state.notices.sort(function(a,b) {
                const first = a.createdDate.split('.').reverse().join('');
                const second = b.createdDate.split('.').reverse().join('');
                return first > second ? 1 : first < second ? -1 : 0;
            });

        }
    }
});

export const {fetchNotices, setCurrentPage, editTask, deleteUser, sortTasks} = noticesSlice.actions;
export const usersReducer = noticesSlice.reducer;




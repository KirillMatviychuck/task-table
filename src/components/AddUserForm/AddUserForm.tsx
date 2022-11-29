import React from 'react';
import {useFormik} from 'formik';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {useNavigate, useParams} from 'react-router-dom';

import {useAppDispatch} from '../../hooks/hooks';
import {editTask} from '../../redux/slices/notice';

import styles from './AddUserForm.module.scss';
import AddUserFormHeader from './AddUserFormHeader/AddUserFormHeader';

const AddUserForm = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            name: '',
            phoneNumber: '',
            email: '',
        },
        validate(values) {
            if (!values.title && !values.name && !values.phoneNumber && !values.email) {
                return {
                    title: 'error',
                    name: 'error',
                    phoneNumber: 'error',
                    email: 'error',
                };
            }
            if (!values.title) {
                return {
                    title: 'error',
                };
            }
            if (!values.name) {
                return {
                    name: 'error',
                };
            }
            if (!values.phoneNumber) {
                return {
                    phoneNumber: 'error'
                };
            }
            if (!values.email) {
                return {
                    email: 'error'
                };
            }
        },
        onSubmit: values => {
            dispatch(editTask(
                {
                    id: id ? id : '',
                    title: values.title,
                    name: values.name,
                    email: values.email,
                    phone: values.phoneNumber
                }
            ));
            navigate('/');
        },
    });

    return (
        <div className={styles.formWrap}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <AddUserFormHeader/>

                <div className={styles.mainBlock}>
                    <div className={styles.inputBlock}>
                        <label htmlFor='title'
                               className={formik.touched.title && formik.errors.title
                                   ? styles.labelError : ''}>
                            Назва</label>
                        <input
                            className={formik.touched.title && formik.errors.title
                                ? styles.inputError : styles.defaultInput}
                            type='text'
                            placeholder='Статус посилки'
                            {...formik.getFieldProps('title')}
                        />
                    </div>
                    <div className={styles.inputBlock}>
                        <label htmlFor='name'
                               className={formik.touched.name && formik.errors.name
                                   ? styles.labelError : ''}>
                            Ім'я та прізвище</label>
                        <input
                            className={formik.touched.name && formik.errors.name
                                ? styles.inputError : styles.defaultInput}
                            type='text'
                            placeholder='Через пробіл'
                            {...formik.getFieldProps('name')}
                        />
                    </div>
                    <div className={`${styles.inputBlock} ${styles.phoneBlock}`}>
                        <label htmlFor='phoneNumber'
                               className={formik.touched.phoneNumber && formik.errors.phoneNumber
                                   ? styles.labelError : ''}>
                            Номер телефону</label>
                        <div className={styles.phoneCode}>
                            <PhoneInput
                                className={formik.touched.phoneNumber && formik.errors.phoneNumber
                                    ? styles.phoneInputError : styles.phoneCodeChanger}
                                international
                                placeholder='1 (999) 999-999'
                                value={formik.values.phoneNumber}
                                onChange={(e: string) => formik.values.phoneNumber = e}
                            />
                        </div>
                    </div>
                    <div className={styles.inputBlock}>
                        <label htmlFor='email'
                               className={formik.touched.email && formik.errors.email  ? styles.labelError : ''}>
                            Email</label>
                        <input
                            className={formik.touched.email && formik.errors.email
                                ? styles.inputError : styles.defaultInput}
                            type='email'
                            placeholder='example.com'
                            {...formik.getFieldProps('email')}

                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.submitBtn}>Додати користувача</button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import PageDefault from '../../components/page-default/page-default'
import { Lock, EmailOutline, AccountPlain } from '../../components/icons/icons'

import styles from './signup.module.scss'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimum character length of 3 required.')
        .max(32, 'Maximum character length of 32 exceeded.')
        .required('Name required.'),
    email: Yup.string()
        .email('Invalid email.')
        .required('Email required.'),
    password: Yup.string()
        .required('Password required.')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.'
        ),
    confirmPassword: Yup.string()
        .required('Password confirmation required.')
        .oneOf(
            [Yup.ref('password')],
            "Passwords don't match. Please try again."
        )
})

const SignUp = () => {
    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    return (
        <PageDefault>
            <div className={styles.formSignup}>
                <div className={styles.formHeader}>
                    <h1 className={styles.formLabel}>Create Account</h1>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignupSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            <div className={styles.fieldGroup}>
                                <AccountPlain />
                                <Field
                                    className={styles.inputField}
                                    type='text'
                                    name='name'
                                    placeholder='Name'
                                />
                            </div>
                            <ErrorMessage
                                name='name'
                                component='div'
                                className={styles.errorMessage}
                            />
                            <div className={styles.fieldGroup}>
                                <EmailOutline />
                                <Field
                                    className={styles.inputField}
                                    type='email'
                                    name='email'
                                    placeholder='Email Address'
                                />
                            </div>
                            <ErrorMessage
                                name='email'
                                component='div'
                                className={styles.errorMessage}
                            />
                            <div className={styles.fieldGroup}>
                                <Lock />
                                <Field
                                    className={styles.inputField}
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                />
                            </div>
                            <ErrorMessage
                                name='password'
                                component='div'
                                className={styles.errorMessage}
                            />
                            <div className={styles.fieldGroup}>
                                <Lock />
                                <Field
                                    className={styles.inputField}
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                />
                            </div>
                            <ErrorMessage
                                name='confirmPassword'
                                component='div'
                                className={styles.errorMessage}
                            />
                            <button
                                className={styles.buttonSubmit}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Create Account
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={styles.loginHint}>
                <p className={styles.loginHintLabel}>
                    Already have an account?{' '}
                    <a className={styles.loginHintLink} href='/login'>
                        Sign In
                    </a>
                </p>
            </div>
        </PageDefault>
    )
}

export default SignUp

import React from 'react'
import { connect } from 'react-redux'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { signInWithGoogle, auth } from '../../firebase/firebase.utils'
import {
    emailSignInStart,
    googleSignInStart,
    signInFailure
} from '../../store/auth/auth.actions'

import PageDefault from '../../components/page-default/page-default'
import { Lock, EmailOutline } from '../../components/icons/icons'

import styles from './signin.module.scss'

const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Email required.'),
    password: Yup.string()
        .required('Password required.')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.'
        )
})

const SignIn = ({ googleSignInStart, emailSignInStart, signInFailure }) => {
    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const { email, password } = values

        try {
            emailSignInStart()
            await auth.signInWithEmailAndPassword(email, password)
            setSubmitting(false)
        } catch (error) {
            setFieldError('error', 'Invalid username or password')
            signInFailure(error.message)
        }
    }

    const onSignInWithGoogle = () => {
        googleSignInStart() // redux action
        signInWithGoogle() // firebase auth
    }

    return (
        <PageDefault opt={{ header_has_user_button: false }}>
            <div className={styles.formikWrapper}>
                <div className={styles.formHeader}>
                    <h1 className={styles.formLabel}>Sign In</h1>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        error: ''
                    }}
                    enableReinitialize
                    validationSchema={FormSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            <Field type='text' name='error' hidden />
                            <ErrorMessage
                                name='error'
                                component='div'
                                className={styles.onSubmitErrorMessage}
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
                            <button
                                className={styles.buttonSubmit}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className={styles.fieldGoogleSignIn}>
                    <span className={styles.labelGoogleSignIn}>
                        OR SIGN IN WITH GOOGLE
                    </span>
                    <button
                        className={styles.btnSubmitGoogleAuth}
                        onClick={onSignInWithGoogle}
                    >
                        Google Sign In
                    </button>
                </div>
            </div>
            <div className={styles.loginHint}>
                <p className={styles.loginHintLabel}>
                    Don&apos;t have an account?{' '}
                    <a className={styles.loginHintLink} href='/register'>
                        Create one now
                    </a>
                </p>
            </div>
        </PageDefault>
    )
}

const actionCreators = {
    googleSignInStart,
    emailSignInStart,
    signInFailure
}

export default connect(null, actionCreators)(SignIn)

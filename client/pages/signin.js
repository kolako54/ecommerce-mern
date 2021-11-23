import React, { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { DataContext } from '../store/GlobalState'
import { postData } from '../db/fetchData'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Signin() {
    const router = useRouter();
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    useEffect(() => {
        if (Object.keys(auth).length !== 0) {
            router.push('/');
        }
    }, [auth])
    const handleChangeInput = e => {
        const { value, name } = e.target;

        setUserData({ ...userData, [name]: value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        const res = await postData('auth/login', userData)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
        dispatch({ type: 'AUTH', payload: { token: res.access_token, user: res.user } })
        Cookies.set('refreshToken', res.refresh_token, {
            path: 'api/auth/accessToken',
            expires: '15d',
            sameSite: 'lax',
            // httpOnly: true
        })
        localStorage.setItem('firstLogin', true)
    }


    return (
        <div>
            <Head>
                <title>Sign in Page</title>
            </Head>
            <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={onSubmitHandle}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" onChange={handleChangeInput} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" onChange={handleChangeInput} value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-dark w-100">Login</button>
                <p className="my-2">You don't have an account?
                    <Link href="/register"><a style={{ color: 'crimson' }}> Register</a></Link>
                </p>
            </form>
        </div>
    )
}


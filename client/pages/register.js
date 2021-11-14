import React, { useContext, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import validation from '../utils/validation'
import { DataContext } from '../store/GlobalState'
import { postData } from '../db/fetchData'

export default function Register() {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
    const [userData, setUserData] = useState(initialState);
    const { name, email, password, cf_password } = userData;
    const [state, dispatch] = useContext(DataContext);
    const handleChangeInput = e => {
        const { value, name } = e.target;

        setUserData({ ...userData, [name]: value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        const errMsg = validation(name, email, password, cf_password);
        if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        const res = await postData('auth/register', userData)
        console.log(res)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        console.log(userData);
    }
    return (
        <div>
            <Head>
                <title>Register Page</title>
            </Head>
            <form className="mx-auto my-4" onSubmit={onSubmitHandle} style={{ maxWidth: '500px' }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={handleChangeInput} name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={email} onChange={handleChangeInput} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input value={password} onChange={handleChangeInput} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input value={cf_password} onChange={handleChangeInput} name="cf_password" type="password" className="form-control" id="exampleInputPassword2" />
                </div>
                <button type="submit" className="btn btn-dark w-100">Register</button>
                <p className="my-2">already have an account?
                    <Link href="/signin"><a style={{ color: 'crimson' }}> Login Now</a></Link>
                </p>
            </form>
        </div>
    )
}

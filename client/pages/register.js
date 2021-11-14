import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import Validate from './../utils/validation'

export default function Register() {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
    const [userData, setUserData] = useState(initialState);
    const { name, email, password, cf_password } = userData
    const handleChangeInput = e => {
        const { value, name } = e.target;
        // const err = Validate({ [name]: value });
        console.log(err);
        setUserData({ ...userData, [name]: value })
    }
    const onSubmitHandle = (e) => {
        e.preventDefault();
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

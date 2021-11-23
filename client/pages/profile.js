import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import validation from '../utils/validation'
import { patchData } from '../db/fetchData'

export default function Profile() {
    const initialState = {
        avatar: '',
        name: '',
        password: '',
        cf_password: ''
    }
    const [data, setData] = useState(initialState);
    const { avatar, name, password, cf_password } = data;
    const { state, dispatch } = useContext(DataContext);
    const { auth, notify } = state;
    useEffect(() => {
        if (auth.user) {
            setData({ ...data, name: auth.user.name })
        }
    }, [auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log('handleUpdateProfile')
        if (password) {
            const errMsg = validation(name, auth.user.email, password, cf_password)
            if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
            updatePassword();
        }

        // dispatch({ type: 'AUTH', payload: { name, password, cf_password } })
        // dispatch({ type: 'NOTIFY', payload: { success: 'Secussfully updated' } })
    }
    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        patchData('user/resetPassword', { password }, auth.token)
            .then(res => {
                if (res.err) {
                    return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                }
                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }
    if (!auth.user) return null
    return (
        <div className="profile_page">
            <Head>
                <title>Profile</title>
            </Head>
            <section className="row text-secondary my-3">
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">{auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}</h3>
                    <div className="avatar">
                        <img src={auth.user.avatar} alt={auth.user.avatar} />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" />
                        </span>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} type="text" name="name" defaultValue={auth.user.name} className="form-control" placeholder="Your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={auth.user?.email} disabled={true} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input onChange={handleChange} type="password" name="password" value={password} className="form-control" placeholder="Your new password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input onChange={handleChange} type="password" name="cf_password" value={cf_password} className="form-control" placeholder="Your confirm password" />
                    </div>
                    <button onClick={handleUpdateProfile} className="btn btn-info" disabled={notify.loading}>Update</button>
                </div>
                <div className="col-md-8">
                    <h3>Orders</h3>
                </div>
            </section>
        </div>
    )
}

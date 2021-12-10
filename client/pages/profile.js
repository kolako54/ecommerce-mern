import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import validation from '../utils/validation'
import { patchData } from '../db/fetchData'
import { ImageUpload } from './../utils/imageUpload'
import Link from 'next/link'
import Image from 'next/image'

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
    const { auth, notify, orders } = state;
    console.log('inside of profile page', orders)
    useEffect(() => {
        if (auth.user) {
            setData({ ...data, name: auth.user.name })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log('handleUpdateProfile')
        if (password) {
            const errMsg = validation(name, auth.user.email, password, cf_password)
            if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
            updatePassword();
        }
        if (name !== auth.user.name || avatar) await updateInFor();

        // dispatch({ type: 'AUTH', payload: { name, password, cf_password } })
        // dispatch({ type: 'NOTIFY', payload: { success: 'Secussfully updated' } })
    }
    const updateInFor = async () => {
        let media;
        console.log('updateInForrrrrrr');
        console.log(avatar)
        console.log('updateInForrrrrrr2');

        console.log([avatar])
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        if (avatar) {
            console.log('mediaaaaaa')
            media = await ImageUpload([avatar])
        }
        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
            dispatch({
                type: 'AUTH', payload: {
                    token: auth.token,
                    user: res.user,
                }
            });
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })
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

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return dispatch({ type: 'NOTIFY', payload: { error: 'File does not exist.' } })
        }
        if (file.size > 1024 * 1024) { //1mb
            return dispatch({ notify: 'NOTIFY', payload: { error: 'The largest image size is 1mb.' } })
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return dispatch({ type: 'NOTIFY', payload: { error: 'Image format is incorrect.' } })
        }
        console.log(file);
        setData({ ...data, avatar: file })
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
                        <Image layout="fill" src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt={"avatar"} />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
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
                <div className="col-md-8 ">
                    <h3 className="text-uppercase">Orders</h3>
                    <div className="my-3 table-responsive">
                        <table className="table-bordered table-hover w-100 text-uppercase"
                            style={{ minWidth: '600px', cursor: 'pointer' }}>
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">delivered</td>
                                    <td className="p-2">paid</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, i) => (
                                        <tr key={i}>
                                            <td className="p-2">
                                                <Link href={`/detail-order/${order._id}`}>
                                                    {order._id}
                                                </Link>
                                            </td>
                                            <td className="p-2">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-2">${order.total}</td>
                                            <td className="p-2">
                                                {
                                                    order.delivered
                                                        ? <i className="fas fa-check text-success"> </i>
                                                        : <i className="fas fa-times text-danger"> </i>
                                                }
                                            </td>
                                            <td className="p-2">
                                                {
                                                    order.paid
                                                        ? <i className="fas fa-check text-success"> </i>
                                                        : <i className="fas fa-times text-danger"> </i>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

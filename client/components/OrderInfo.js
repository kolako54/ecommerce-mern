import React, { useContext, useRef } from 'react'
import Link from 'next/link'
import { DataContext } from '../store/GlobalState';
import { patchData } from '../db/fetchData';
import { updateOrder } from '../store/Actions';
import Image from 'next/image'
import { useRouter } from 'next/router';


export default function OrderInfo({ orderDetail }) {
    const router = useRouter()
    const refPayBtn = useRef();
    const { state, dispatch } = useContext(DataContext);
    const { auth, orders } = state;

    const handleBuy = async (order) => {
        const { _id } = order;
        dispatch({ type: 'NOTIFY', payload: { loading: true } })


        setTimeout(() => {
            patchData(`order/${_id}`, null, auth.token)
                .then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    console.log(`orders/${_id}`, res.user);
                    // dispatch({type: 'ADD_ORDERS', payload: [res]})
                    dispatch(updateOrder(orders, _id, {
                        ...order, paid: true, dateOfPayment: new Date().toISOString()
                    }, 'ADD_ORDERS'));

                    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                });

            router.push('/profile')
            alert(`Transaction completed by ${auth.user.name}`)
        }, 2000);

    }
    return (
        <>
            {
                orderDetail.map((order) => (
                    <div key={order._id} style={{ margin: '20px auto' }} className="row justify-content-around">

                        <div className="text-uppercase my-3" style={{ maxWidth: '600px' }}>
                            <h2 className="text-break">Order {order._id}</h2>
                            <div className="mt-4 text-secondary">
                                <h3>Shipping</h3>
                                <p>Name: {order.user.name}</p>
                                <p>Email: {order.user.email}</p>
                                <p>Address: {order.address}</p>
                                <p>Mobile: {order.mobile}</p>
                                <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                                d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        order.delivered ? `Delivered on ${order.updatedAt}` : 'Not Delivered'
                                    }
                                </div>
                                <h3>Payment</h3>
                                <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                                d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        order.paid ? `Paid on ${order.dateOfPayment}` : 'Not Paid'
                                    }
                                </div>
                                <div>
                                    <h3>Order Items</h3>
                                    {
                                        order.cart.map((item, i) => {
                                            return (
                                                <div className="row border-bottom mx-0 p-2 justify-content-between align-middle"
                                                    key={i} style={{ maxWidth: '550x' }}>
                                                    <Image layout="fixed" src={item.images[0].url} alt={item.images[0].url} width="100" height="100"
                                                        style={{ width: '50px', height: '45px', objectFit: 'cover' }}
                                                    />
                                                    <h5 className="flex-fill text-secondary px-3 m-0">
                                                        <Link href={`/product/${item._id}`}>
                                                            {item.title}
                                                        </Link>
                                                    </h5>
                                                    <span className="text-info m-0">
                                                        {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            !order.paid && <div className="p-4">
                                <h2 className="mb-4 text-uppercase">
                                    Total: ${order.total}
                                </h2>
                                <button className="btn btn-dark w-100" onClick={() => handleBuy(order)}>PAY NOW</button>
                            </div>
                        }
                    </div>
                ))
            }
        </>
    )
}

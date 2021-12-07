import Head from "next/head";
import { useRouter } from 'next/router'
import { DataContext } from "../../store/GlobalState";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
const DetailOrder = () => {
    const { state, dispatch } = useContext(DataContext);
    const { orders, auth } = state;
    const router = useRouter();
    const [orderDetail, setOrderDetail] = useState([]);
    console.log(orderDetail);

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id);
        setOrderDetail(newArr);
    }, [orders])
    return (
        <div className="my-3">
            <Head>
                <title>Detail Orders</title>
            </Head>
            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left"></i>Go Back
                </button>
            </div>
            <div style={{ maxWidth: '600px', margin: '20px auto' }}>
                {
                    orderDetail.map((order) => (
                        <div key={order._id} className="text-uppercase my-3">
                            <h2 className="text-break">Order {order._id}</h2>
                            <div className="mt-4 text-secondary">
                                <h4>Shipping</h4>
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
                                <div>
                                    <h4>Order Items</h4>
                                    {
                                        order.cart.map((item, i) => {
                                            return (
                                                <div className="row border-bottom mx-0 p-2 justify-content-between align-middle"
                                                    key={i} style={{ maxWidth: '550x' }}>
                                                    <img src={item.images[0].url} alt={item.images[0].url}
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
                    ))
                }
            </div>
        </div>
    )
}
export default DetailOrder;
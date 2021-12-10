import Head from "next/head";
import { useRouter } from 'next/router'
import { DataContext } from "../../store/GlobalState";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import OrderInfo from "../../components/OrderInfo";
const DetailOrder = () => {
    const { state, dispatch } = useContext(DataContext);
    const { orders, auth } = state;
    const router = useRouter();
    const [orderDetail, setOrderDetail] = useState([]);
    console.log(orderDetail);

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id);
        setOrderDetail(newArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders])
    return (
        <div className="my-3">
            <Head>
                <title>Detail Orders</title>
            </Head>
            <div>
                <button className="btn btn-dark" onClick={() => router.push("/profile")}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i>Go Back
                </button>
            </div>
            <OrderInfo orderDetail={orderDetail}/>
        </div>
    )
}
export default DetailOrder;
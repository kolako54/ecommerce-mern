import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem';
import Link from 'next/link'
import { getData, postData } from '../db/fetchData';
import PaypalBtn from './paypalBtn'
import { useRouter } from 'next/router';

export default function Cart() {
    const router = useRouter()

    const { state, dispatch } = useContext(DataContext);
    console.log('this is cart component', state)
    const { card, auth, orders } = state;
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [payment, setPayment] = useState('')
    // const [testPayment, setTestPayment] = useState('')

    useEffect(() => {
        const getTotal = () => {
            const res = card.reduce((prev, curr) => {
                return prev + (curr.price * curr.quantity)
            }, 0)
            setTotal(res)
        }
        getTotal();
    }, [card])
    useEffect(() => {
        const cardLocal = JSON.parse(localStorage.getItem('__next__card01__develio'));
        if (cardLocal && cardLocal.length > 0) {
            let newArr = []
            const updateCart = async () => {
                for (const item of cardLocal) {
                    const res = await getData(`product/${item._id}`)
                    const { _id, title, images, price, inStock, sold } = res.product;
                    if (inStock > 0) {
                        newArr.push({ _id, title, images, price, inStock, sold, quantity: item.quantity > inStock ? 1 : item.quantity })
                    }
                }
                dispatch({ type: 'ADD_CARD', payload: newArr });
            }
            updateCart()
        }
    }, [])

    if (card.length === 0) {
        return <img className="mt-5 img-responsive w-100" src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="Empty" />
    }
    const handlePayment = () => {
        if (!address || !mobile) {
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please add your address and mobile.' } })
        }
        return dispatch({ type: 'NOTIFY', payload: { error: "It's just for paypal payment in real production, Please use this below button." } })
        // setPayment(true)
    }
    const handleBuy = () => {
        if (!address || !mobile) {
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please add your address and mobile.' } })
        }
        // if(!auth.user){
        //     router.push('/signin')
        //     return dispatch({ type: 'NOTIFY', payload: { error: 'You should log in first!'} })

        // }
        

        // setPayment(true)
        dispatch({ type: 'NOTIFY', payload: { loading: true} })
        setTimeout(() => {
            postData('order', { address, mobile, card, total }, auth.token)
                .then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    console.log('orders',res.user);
                    // dispatch({type: 'ADD_ORDERS', payload: [res]})
                    dispatch({ type: 'ADD_CARD', payload: [] });
                    const newOrder = {
                        ...res.newOrder,
                        user: auth.user
                    }
                    dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
                    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                });
            console.log('authhhhhhhhhhhhhhhh', auth.user.name)
            alert(`Transaction completed by ${auth.user.name}`)
        }, 2000);

    }
    return (
        <div className="row mx-auto my-5">
            <Head>
                <title>Cart Page</title>
            </Head>
            <div className="col-md-8 text-secondary table-responsive my-3">
                <h2 className="text-uppercase">
                    Shopping Cart
                </h2>
                <table className="table my-3">
                    <tbody>
                        {card.map(item => (
                            <CartItem key={item._id} item={item} dispatch={dispatch} card={card} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-4 text-right text-uppercase text-secondary">
                <form>
                    <h2>Shipping</h2>
                    <label htmlFor="adress">Address</label>
                    <input onChange={e => setAddress(e.target.value)}
                        value={address} type="text" name="address" id="address"
                        className="form-control mb-2" />
                    <h2>Mobile</h2>
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={e => setMobile(e.target.value)}
                        type="text" name="mobile" id="mobile"
                        className="form-control mb-2" value={mobile} />
                </form>
                <h3>Total: <span className="text-info">${total}</span></h3>
                {payment ? <PaypalBtn total={total} address={address} mobile={mobile} state={state} dispatch={dispatch} /> : <Link href={auth.user ? '#' : '/signin'}>
                    <a onClick={handlePayment} className="btn btn-dark my-2 w-100">Process with payment</a>
                </Link>}
                <button className="btn btn-dark w-100" onClick={handleBuy}>BUY (FREE4TEST)</button>

            </div>


        </div>
    )
}

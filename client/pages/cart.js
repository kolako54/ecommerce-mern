import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem';
import Link from 'next/link'
import { getData } from '../db/fetchData';
export default function Cart() {
    const { state, dispatch } = useContext(DataContext);
    const { card, auth } = state;
    const [total, setTotal] = useState(0)

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
                    const { _id, title, images, price, inStock } = res.product;
                    if (inStock > 0) {
                        newArr.push({ _id, title, images, price, inStock, quantity: item.quantity > inStock ? 1 : item.quantity })
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
                    <input type="text" name="address" id="address" className="form-control mb-2" />
                    <h2>Mobile</h2>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" id="mobile" className="form-control mb-2" />

                </form>
                <h3>Total: <span className="text-info">${total}</span></h3>
                <Link href={auth.user ? '#' : '/signin'}>
                    <a className="btn btn-dark my-2">Process with payment</a>
                </Link>
            </div>


        </div>
    )
}

import React, { useContext } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem';

export default function card() {
    const { state, dispatch } = useContext(DataContext);
    const { card } = state;
    if (card.length === 0) {
        return <img className="mt-5 img-responsive w-100" src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="Empty" />
    }
    return (
        <div className="row mx-auto">
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
                            <CartItem Key={item._id} item={item} dispatch={dispatch} card={card} />
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

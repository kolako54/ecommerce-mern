import React, { useContext } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'

export default function card() {
    const {state, dispatch} = useContext(DataContext);
    const {card} = state;
    if(card.length === 0){
        return <img className="mt-5 img-responsive w-100" src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="Empty" />
    }
    return (
        <div>
        <Head>
            <title>Cart Page</title>
        </Head>
        <h1>
            Cart
        </h1>
            
        </div>
    )
}

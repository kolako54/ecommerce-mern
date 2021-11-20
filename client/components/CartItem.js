import React from 'react'
import Link from 'next/link'
import { decrease, increase } from '../store/Actions'

export default function CartItem({ item, dispatch, card }) {
    return (
        <tr>
            <td style={{ width: '100px', overflow: 'hidden' }}>
                <img style={{ minWidth: '80px', height: '80px' }}
                    className="img-thumbnail w-100"
                    src={item.images[0].url}
                    alt={item.images[0].url}
                    alt="" />
            </td>
            <td style={{ minWidth: '200px' }} className="w-50 align-middle">
                <h5 className="text-capitalize text-secondary">
                    <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                    </Link>
                </h5>
                <h6 className="text-danger">${item.quantity * item.price}
                </h6>
                {item.inStock > 0 ?
                    <p className="mb-1 text-danger"> In Stock: {item.inStock} </p>
                    : <p className="mb-1 text-danger">Out Stock</p>}

            </td>
            <td className="align-middle" style={{ minWidth: '150px' }}>
                <button className="btn btn-outline-secondary" disabled={item.quantity < 2 ? true : false} onClick={() => dispatch(decrease(card, item._id))}> - </button>
                <span className="px-3">{item.quantity}</span>
                <button className="btn btn-outline-secondary" disabled={item.quantity === item.inStock ? true : false} onClick={() => dispatch(increase(card, item._id))}> + </button>
            </td>
            <td className="align-middle" style={{ minWidth: '50px', cursor: 'pointer' }}>
                <i className="far fa-trash-alt text-danger" style={{ fontSize: '18px' }}
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({ type: 'ADD_MODAL', payload: { data: card, title: item.title, id: item._id } })}>

                </i>
            </td>
        </tr>
    )
}

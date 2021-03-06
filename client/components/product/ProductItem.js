import React, {useContext} from 'react'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { addToCard } from '../../store/Actions'
import Image from 'next/image'

export default function ProductItem({ product }) {
    const {state, dispatch} = useContext(DataContext);
    const {card} = state
    const userLink = () => {
        return (
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info" style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
                <button disabled={product.inStock === 0 ? true : false} className="btn btn-success" style={{marginLeft: '5px', flex: 1}} onClick={() => dispatch(addToCard(product, card))}>
                    buy
                </button>
            </>

        )
    }
    return (
        <div className="card" style={{ width: '18rem' }}>
            <Image className="card-img-top" layout="responsive" height="100" width="100" src={product.images[0].url} alt={product.images[0].url} />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>{product.title}</h5>
                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">${product.price}</h6>
                    {
                        product.inStock > 0 ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                            : <h6 className="text-danger">Out Stock</h6>
                    }
                </div>
                <p className="card-text" title={product.description}>{product.description}</p>
                <div className="row justify-content-between mx-0">
                    {userLink()}
                </div>
            </div>

        </div>
    )
}

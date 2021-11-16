import React, { useState } from 'react'
import { getData } from '../../db/fetchData';
import Head from 'next/head'


export default function Product(props) {
    const [product] = useState(props.product);
    const [tab, setTab] = useState(0);
    const isActive = (i) => {
        if (tab === i) return 'active';
        return '';
    }

    return (
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>
            <div className="col-md-6">
                <img className="d-block img-thumbnail rounded mt-4 w-100" src={product.images[tab].url} alt={product.images[tab].url} style={{ height: '350px' }} />

                <div className="row mx-0" style={{ cursor: 'pointer' }}>
                    {product.images.map((img, i) => (
                        <img onClick={() => setTab(i)} key={i} src={img.url} alt={img.url} className={`img-thumbnail rounded ${isActive(i)}`} style={{ height: '80px', width: '20%' }} />
                    ))}

                </div>
            </div>
            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h2 className="text-danger">${product.price}</h2>
                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0 ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                            : <h6 className="text-daner">Out Stock</h6>
                    }
                    <h6 className="text-danger">Sold: {product.sold}</h6>
                </div>
                <div className="my-2" style={{fontWeight: 300}}>{product.description}</div>
                <div className="my-2">{product.content} {product.content} {product.content}</div>
                <button type="button" className="btn btn-dark d-block my-3 px-5">Buy</button>


            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await getData(`product/${id}`);
    console.log(id);
    return {
        props: {
            product: res.product
        }
    }
}

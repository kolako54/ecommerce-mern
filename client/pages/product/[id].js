import React, { useContext, useState } from 'react'
import { getData } from '../../db/fetchData';
import Head from 'next/head'
import { DataContext } from '../../store/GlobalState';
import { ACTIONS, addToCard } from '../../store/Actions';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image'



export default function Product(props) {
    const router = useRouter()
    const [product] = useState(props.product);
    const [tab, setTab] = useState(0);
    const { state, dispatch } = useContext(DataContext);
    const { card } = state;
    const isActive = (i) => {
        if (tab === i) return 'active';
        return '';
    }
    console.log('fuck', router.isFallback)
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>
            <div className="col-md-6">
                <div className="d-block img-thumbnail rounded mt-4 w-100">
                    <Image layout="responsive" width="100" height="100" src={product.images[tab].url} alt={product.images[tab].url} style={{ height: '350px' }} />
                </div>
                <div className="row mx-0" style={{ cursor: 'pointer' }}>
                    {product.images.map((img, i) => (
                        <div key={i} className={`img-thumbnail rounded ${isActive(i)}`}>
                            <Image layout="intrinsic" width="100" height="100" onClick={() => setTab(i)}
                                src={img.url} alt={img.url}

                                style={{ height: '80px', width: '20%' }} />
                        </div>
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
                <div className="my-2" style={{ fontWeight: 300 }}>{product.description}</div>
                <div className="my-2">{product.content} {product.content} {product.content}</div>
                <button type="button" className="btn btn-dark d-block my-3 px-5" onClick={() => dispatch(addToCard(props.product, card))}>Buy</button>
            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await getData(`product/${id}`);
    console.log(id);
    if (!res) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            product: res.product,
        },
    }
}

// export async function getStaticProps({ params: { id } }) {
//     const res = await getData(`product/${id}`);
//     console.log(id);
//     if(!res){
//         return{
//             notFound: true
//         }
//     }
//     return {
//         props: {
//             product: res.product
//         },
//         revalidate: 5
//     }
// }
// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     const res = await getData('product')
//     // const posts = await res.json()

//     // Get the paths we want to pre-render based on posts
//     const paths = res.products.map((item) => ({
//       params: { id: item._id },
//     }))

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
//   }

import React from 'react'
import { getData } from '../db/fetchData'
import { useState } from 'react'
import Head from 'next/head'
// import product from './api/product';
import ProductItem from './../components/product/ProductItem'

export default function index(props) {

  const [products, setProducts] = useState(props.products);
  return (
    <div className="products">
      <Head>
        <title>Home Page</title>
      </Head>
      {products.length === 0 ? <h2> No Product </h2> : products.map(product => <ProductItem key={product._id} product={product} />)}
    </div>
  )
}
/*********** Server Side Render ****************/

export async function getServerSideProps() {
  const res = await getData('product');
  console.log('ssr')
  console.log(res);
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  }
}

/*********** Incremental Static Regeneration ****************/
// export async function getStaticProps() {
//   const res = await getData('product');


//   return {
//     props: {
//       products: res.products,
//       result: res.result,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 5, // In seconds
//   }
// }




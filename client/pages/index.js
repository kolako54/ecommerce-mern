import React from 'react'
import { getData } from '../db/fetchData'
import { useState } from 'react'
import Head from 'next/head'
// import product from './api/product';
import ProductItem from './../components/product/ProductItem'

export default function index(props) {

  const [products, setProducts] = useState(props.products);
  console.log(products)
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
// export async function getStaticPaths() {
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: 'blocking' }
// }
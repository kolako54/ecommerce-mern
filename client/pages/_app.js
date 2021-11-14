import Layout from '../components/layout'
import '../styles/globals.css'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp

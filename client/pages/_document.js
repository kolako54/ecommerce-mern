import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="Dev AT E-commerce website with Next.js" />
                    <meta name="description" content="Dev AT E-commerce website with Next.js" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
                    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap" rel="stylesheet"></link>                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
                    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
                    <script
                        src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}>
                    </script>                
                </Head>
                <body style={{ fontFamily: "Rajdhani" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
        // client id AS2V-pBaha0pIgqTzKampNk8supO8ZH_wOcTJ32zROOmOZaxR_Tit-MmNWyEcVK-b6yYT0e_B5Zd4OnC
        //sandbox account sb-63pmo8648192@business.example.com
    }
}

export default MyDocument
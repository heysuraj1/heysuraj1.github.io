import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/Script'
import Layout from '../Components/Layout'



function MyApp({ Component, pageProps }) {
  return <Layout>
          <Head>
                    <div>
            {/* Required meta tags */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="icon" href="img/favicon.png" type="image/png" />
            <title>Eiser ecommerce</title>
            {/* Bootstrap CSS */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/vendors/linericon/style.css" />
            <link rel="stylesheet" href="/css/font-awesome.min.css" />
            <link rel="stylesheet" href="/css/themify-icons.css" />
            <link rel="stylesheet" href="/css/flaticon.css" />
            <link rel="stylesheet" href="/vendors/owl-carousel/owl.carousel.min.css" />
            <link rel="stylesheet" href="/vendors/lightbox/simpleLightbox.css" />
            <link rel="stylesheet" href="/vendors/nice-select/css/nice-select.css" />
            <link rel="stylesheet" href="/vendors/animate-css/animate.css" />
            <link rel="stylesheet" href="/vendors/jquery-ui/jquery-ui.css" />
            {/* main css */}
            <link rel="stylesheet" href="/css/style.css" />
            <link rel="stylesheet" href="/css/responsive.css" />
          </div>

          </Head>
       
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"/> 

          <Component {...pageProps} />

         </Layout>
}

export default MyApp

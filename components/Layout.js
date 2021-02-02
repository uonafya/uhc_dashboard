import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';


// const layoutStyle = {
//   margin: 20,
//   padding: 20,
//   border: '1px solid #DDD'
// };

const Layout = props => (
  // <div style={layoutStyle}>
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Ministry Of Health UHC Dashboard</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet"/>
      <link rel="stylesheet" href="/static/css/bulma.min.css" />
      <link rel="stylesheet" href="/static/fontawesome/css/all.min.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/main.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/custom.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/tabs.css"/>
      <link rel="stylesheet" type="text/css" href="/static/css/leaflet.css"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,400;1,600&display=swap"/> 
      <script async type="text/javascript" src="/static/js/bulma.js"></script>
      <script async type="text/javascript" src="/static/js/tabs.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <script src="/static/js/custom.js"></script>
    </Head>
    <Header />
    <div className="min-h-89-vh">
      {/* <div id="loading-indicator" className={props.pageProps.loading == true ? "hidden": "loading-indicator"}>
        <div><img src="/static/images/ripple-loading.svg" /> </div>
      </div> */}
      <div className="content m-t-40">
        {props.children}
      </div>
    </div>
    <Footer />

    <style jsx global>
      {`
        body{
          font-family: 'Open Sans', sans-serif;
          background: #f3f5f9;
        }
      `}
    </style>
  </div>
);

export default Layout;

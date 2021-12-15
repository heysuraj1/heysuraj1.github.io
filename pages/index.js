import FeatureProduct from '../Components/FeatureProduct';
import Footer from '../Components/Footer';
import FrontIcons from '../Components/FrontIcons';
import Hero from '../Components/Hero';
import InspiredProduct from '../Components/InspiredProduct';
import NavBar from '../Components/NavBar'
import NewProduct from '../Components/NewProduct';
import PromoBanner from '../Components/PromoBanner';
import baseurl from '../helpers/baseUrl';

function index({products}) {
  // console.log(products)
  return (
    <div>
      {/* <NavBar/> */}
      <Hero/>
      <FrontIcons/>
      <FeatureProduct product={products} />
      <PromoBanner/>
      <NewProduct/>
      <InspiredProduct/>
      {/* <Footer/> */}
    </div>
  );
}
// export async function getStaticProps() {
//   const res = await fetch(`${baseurl}/api/products`)
//   const data = await res.json()
//   return {
//     props: {
//       products:data
//     }, // will be passed to the page component as props
//   }
// }


export async function getServerSideProps() {
  const res = await fetch(`${baseurl}/api/products`)
  const data = await res.json()
  return {
    props: {
      products:data
    }, // will be passed to the page component as props
  }
}










export default index;
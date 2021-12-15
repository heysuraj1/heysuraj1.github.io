import Link from 'next/link'
import baseurl from '../helpers/baseUrl';

const FeatureProduct = ({ product,props }) => {
  // console.log('niche wala')
  console.log(product);
  return (
    <div>
      
      <section className="feature_product_area section_gap_bottom_custom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="main_title">
                <h2>
                  <span>Featured product</span>
                </h2>
                <p>Bring called seed first of third give itself now ment</p>
              </div>
            </div>
          </div>
          <div className="row">


            {/* Here is the product */}

          {product.map((hit) => {
        return <div className="col-lg-4 col-md-6 " key={hit._id}>
          <Link href={'product/[id]'}  as={`${baseurl}/product/${hit._id}`}>

        <div className="single-product sua">
          <div className="product-img">
            <img
              className="img-fluid w-100"
              src={hit.mediaUrl}
              
            />
            <div className="p_icon">
              <a href="#">
                <i className="ti-eye" />
              </a>
              <a href="#">
                <i className="ti-heart" />
              </a>
              <a href="#">
                <i className="ti-shopping-cart" />
              </a>
            </div>
          </div>
          <div className="product-btm">
            <a href="#" className="d-block">
              <h4>{hit.name}</h4>
            </a>
            <div className="mt-3">
              <span className="mr-4">₹ {hit.price}</span>
            </div>
          </div>
        </div>
        </Link>
      </div>;
      })}





            





            
          </div>
        </div>
      </section>
    </div>
  );
};

// export async function getStaticProps() {
//   const res = await fetch('http://192.168.43.53:3000/api/products')
//   const data = await res.json()
//   return {
//     props: {
//       products:data
//     }, // will be passed to the page component as props
//   }
// }

export default FeatureProduct;

// import logo from '../../public/ATB3o.gif'
import { parseCookies } from "nookies";
import {useRouter} from 'next/router'
import baseurl from '../../helpers/baseUrl'
import {useState} from 'react'

const Product = ({product}) => {
  const [quantity, setQuantity] = useState(1)
  const cookie = parseCookies();
    const router = useRouter()

    

    //Below Is JUGAAD <=======<< LOL
    // const user = cookie.user ? JSON.stringify(cookie.user) : "";
    const cookieE = cookie.userE ? JSON.stringify(cookie.userE) : "";
    const cookieR = cookie.userR ? JSON.stringify(cookie.userR) : "";





    if(router.isFallback){
        return (
            <>
            <h3 className='text-center mt-5' >Loading...</h3>
            <p className='text-center mt-2'>please have patience</p>
            </>
        )
    }

    const handelClick = async () =>{
        console.log('Add To Cart Clicked')
        const res =  await fetch(`${baseurl}/api/cart`,{
          method:'PUT',
          headers:{'Content-Type':'application/json',"Authorization":cookie.token
        },
        body: JSON.stringify({
            quantity,
            productId:product._id
        })
      })
      const res2 = await res.json()
      // console.log(res2)
      if(res2.error){
      window.alert('Something Wrong Happend Please Try Again Later')

      }
      window.alert('Product Added')
    }



    const handelDelete = async () =>{
      console.log('Delete Button Clicked')
      const res = await fetch(`${baseurl}/api/product/${product._id}`,{
        method:'DELETE'
      })
      await res.json()
      router.push('/')
    }


    return (
        <div>
            <div className="product_image_area">
  <div className="container mb-5">
    <div className="row s_product_inner">
      <div className="col-lg-6">
        <div className="s_product_img">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-50" src={product.mediaUrl}/>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5 offset-lg-1">
        <div className="s_product_text">
          <h3>{product.name}</h3>
          <h2>₹ {product.price}</h2>
          <p>
            {product.description}
          </p>
          <div className="product_count">
            <label htmlFor="qty">Quantity:</label>
            <input type="text"  value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} className="input-text qty" />
            <button onClick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;" className="increase items-count" type="button">
              <i className="lnr lnr-chevron-up" />
            </button>
            <button onClick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;" className="reduced items-count" type="button">
              <i className="lnr lnr-chevron-down" />
            </button>
          </div>
          <div className="card_area mb-5">
            <a className="main_btn" onClick={handelClick}>Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
    <div className="b-example-divider"></div>
    {
      cookieR == '"admin"' ||  cookieR == '"root"'? 
      
    <div className='container text-center mt-5'>
    <a onClick={handelDelete} className="genric-btn danger circle">DELETE</a>
    </div>
      
      
      :
      ""
    }

  </div>
</div>

        </div>       
    );
}




export async function getServerSideProps({params:{id}}) {
    const res = await fetch(`${baseurl}/api/product/${id}`)
    const data = await res.json()


    return {
      props: {product:data}
    }
  }

// export async function getStaticProps({params:{id}}) {
//     const res = await fetch(`${baseurl}/api/product/${id}`)
//     const data = await res.json()


//     return {
//       props: {product:data}
//     }
//   }

  // export async function getStaticPaths() {
  //   // const res = await fetch(`http://192.168.43.53:3000/api/products`)
  //   // const re2 = await res.json()


  //   return {
  //     paths: [
  //       { params: {id:'61b702a204f1d6515aac065e'} } // See the "paths" section below
  //     ],
  //     fallback: true
  //   };
  // }




export default Product; 
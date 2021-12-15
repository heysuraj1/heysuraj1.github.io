import Section from "../Components/Section";
import baseUrl from '../helpers/baseUrl'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useState} from 'react'
import StripeCheckout from "react-stripe-checkout";
import Image from 'next/image'
const Cart = ({error,products}) => {
  let price = 0
  // initDB()

  const {token} = parseCookies()
  let router = useRouter()
  const [cProducts, setCartProduct] = useState(products)

  if(error){
    window.alert(error)
    cookie.remove('user')
    cookie.remove('token')
    router.push('/Login')
  }
  const handelremove = async (pid) =>{
    const res = await fetch(`${baseUrl}/api/cart`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'Authorization':token
    },
    body: JSON.stringify({
      productId:pid
    })
  })
  const res2 = await res.json()
  setCartProduct(res2)
  }

  

  const CartItems = () =>{
    return(
      <>
      {
         cProducts.map(hit=>{
           
          price = price + hit.quantity * hit.product.price
          return <tr key={hit._id}>
          
          <td>
            <div className="media">
              <div className="d-flex">
                <Image className="saga" src={hit.product.mediaUrl} alt='' />
              </div>
              
            </div>
          </td>
          <td>
            <h5>₹ {hit.product.price}</h5>
          </td>
          <td>
            <div className="product_count">
              <input type="text"className="input-text qty" value={hit.quantity} />
              
            </div>
          </td>
          <td>
          <a className="main_btn" onClick={()=>{handelremove(hit.product._id)}}>Remove</a>

          </td>
        {/* </tr> */}
        </tr>
        })
      }
      </>
    )
  }


  const handleCheckout = async (paymentInfo) =>{
    console.log(paymentInfo)

    const res = await fetch(`${baseUrl}/api/payment`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      },
      body:JSON.stringify({
        paymentInfo
      })
      
    })
    const res2 = await res.json()
    console.log(res2)
    router.push('/')

  }


  // const TotalPrice = () =>{
  //   return (<div>
              
  //           <h5>₹ {price}</h5>
  //           <StripeCheckout
  //         name = "Ecom"
  //         amount = {price *100}
  //         image={products[0].product.mediaUrl}
  //         currency='INR'  // <=====<< You change this currency as per your requirement
  //         shippingAddress={true}
  //         billingAddress={true}
  //         zipCode={true}
  //         stripeKey='pk_test_51K5DxkSBkgrOeNWxd726JZI3S2vppyRrozQlfE3PbtJMwAokVec2GD3DUlEiTPK4S96Nr2gIsf9nswyJsdcsAw4s00ZCB7rLUU'
  //         token={(paymentInfo)=>handleCheckout(paymentInfo)}
  //         >      
  //           <button className="gray_btn" >CheckOut</button>
  //       </StripeCheckout>

  //         </div> 
  //   )
  // }
  const TotalPrice = () =>{
    return (
      <div>
        <h5>total: ₹{price}</h5>
        {products.lenght != 0
        ? <StripeCheckout
        name = "My store"
        amount = {price *100}
        image={products.lenght > 0 ?  products[0].product.mediaUrl:""}
        currency='INR'  // <=====<< You change this currency as per your requirement
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey='pk_test_51K5DxkSBkgrOeNWxd726JZI3S2vppyRrozQlfE3PbtJMwAokVec2GD3DUlEiTPK4S96Nr2gIsf9nswyJsdcsAw4s00ZCB7rLUU'
        token={(paymentInfo)=>handleCheckout(paymentInfo)}
        >
        <button className='btn btn-primary'>Checkout</button>
        </StripeCheckout>
        :
        <div>
          <h5>Your Cart Is Empty</h5>
        </div>
     
        }
      </div>
    )
  }

    return (
        <div>
            <Section head='Cart' message='Hey Here Is Your Cart' />
            <div className="container">
            <section className="cart_area">
  <div className="container">
    { !token ?
    <>
    <div className="container text-center">
  <h3 className="text-center">Please Login To View Your Cart</h3>
  <Link href='/Login' passHref>
  <button className="main_btn mt-4" >LOGIN</button>
  
  </Link>


    </div>
  
  </>
  
  :
  <div className="cart_inner">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              
            </tr>
          </thead>
          

          <tbody>
            {CartItems()}

           
           
            {/* //here checkout  */}
            {TotalPrice()}
            
            
            
          </tbody>
        </table>
      </div>
    </div>
  
  
  
  }
    
  </div>
</section>

            </div>
             


        </div>
    );
}



export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    return {
      props: {products:[]}   
    }
  }



const res = await fetch(`${baseUrl}/api/cart`,{
  headers:{
    "Authorization":token
    // "Authorization":token
  }
})
const products = await res.json()
if(products.error){
  return{
    props:{error:products.error}
  }
}


console.log("products",products)
return {
  props: {products}   // <====<< Maybe there could be error, check it at video time number => 16:15
}

}







export default Cart;
import Stripe from 'stripe'
// import {v4 as uuidV4} from 'uuid'
import {v4 as uuidV4 } from 'uuid'
import Cart from '../../models/Cart'
import jwt from 'jsonwebtoken'
import Order from '../../models/Order'


const stripe = Stripe(process.env.STRIPE_SECRET) //<======<< Here we set the stripe secret key
export default  async (req,res) =>{
    const {paymentInfo} = req.body
    const {authorization} = req.headers
        if(!authorization){
        return res.status(401).json({error:"you must logged in"})
        }
        try{
            const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)    
            const cart = await Cart.findOne({user:userId}).populate("products.product")
            let price  = 0
            cart.products.forEach(item=>{
              price = price + item.quantity * item.product.price
            })
            const prevCustomer = await stripe.customers.list({
                email:paymentInfo.email
            })
            const isExistingCustomer  = prevCustomer.data.length > 0
            let newCustomer
            if(!isExistingCustomer){
                 newCustomer =  await stripe.customers.create({
                    email:paymentInfo.email,
                    source:paymentInfo.id
                })
            }

           //Below we are setting up to charge customer

           await stripe.charges.create(
            {
                currency:"INR",
                amount: price * 100,
                receipt_email:paymentInfo.email,
                customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description:`you purchased a product | ${paymentInfo.email}`
            },{
              idempotencyKey:uuidV4()  
            }
        )
        //From below we are setting up show cart details in Account page 
        await new Order({
            user:userId,
            email:paymentInfo.email,
            total:price,
            products:cart.products
        }).save()




        //From Here below we are clearing the cart after chekout
        await Cart.findOneAndUpdate(
            {_id:cart.id},
            {$set:{products:[]}}
        )
        // ya tha't it just till here
           res.status(200).json({message:"payment was successfull"})





        } catch (err) {
            console.log(err)
            return res.status(401).json({error:"error processing payment"})
            
        }
}
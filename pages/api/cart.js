import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'


export default async (req,res)=>{
    switch (req.method) {
        case 'GET':
            await fetchUserCart(req,res)

            break;
        case 'PUT':
            await addProduct(req,res)

            break;


        case 'DELETE':
            await removeProduct(req,res)

            break;
            
           
    }
}

//Blow We are using  Higher Order Component

function Authenticated (icomponent){
    return (req,res)=>{
        const {authorization} = req.headers
        if(!authorization){
        return res.status(401).json({error:"you must logged in"})
        }
        try {
            const {userId} =  jwt.verify(authorization,process.env.JWT_SECRET)   // <===<< CHECK HERE ALSO
            req.userId = userId
            return icomponent(req,res)


        } catch (err) {
            return res.status(401).json({error:"User id ke sath kuch gadbad hai"})
            
        }
    }
}


/*
!This is for authenticate user in cart page
*/

const fetchUserCart = Authenticated (async (req,res) =>{
         const cart =  await Cart.findOne({user:req.userId})
                        .populate("products.product")
         res.status(200).json(cart.products)

})

/*
!This is for adding product in cart
*/

const addProduct = Authenticated (async(req,res)=>{

    const {quantity,productId} = req.body


    const cart = await Cart.findOne({user:req.userId})

    //Start from here  video 19:00 Middelware (video number : #14)

    //Here below we are adding Javascript some method
    //In short we are checking wheather this product availble in our cart or not s
   const pExists =   cart.products.some(pdoc => productId === pdoc.product.toString())

   //Here is main

   if(pExists){
       await Cart.findOneAndUpdate(
           {_id:cart._id,"products.product":productId},
           {$inc:{"products.$.quantity":quantity}}
       )

   }else{
       const newProduct = {quantity,product:productId}
       await Cart.findOneAndUpdate(
           {_id:cart._id},
           {$push:{products:newProduct}}
           )
   }
   res.status(200).json({message:"product added to cart"})
})


/*
!This is for removing product from cart
*/

const removeProduct = Authenticated (async(req,res)=>{
    const {productId} = req.body
  const cart =  await Cart.findOneAndUpdate(
        {user:req.userId},
        {$pull:{products:{product:productId}}},
        {new:true}
    ).populate("products.product")
    res.status(200).json(cart.products)
}) 
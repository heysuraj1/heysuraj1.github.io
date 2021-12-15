// import Fortrial from "./Fortrial";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import baseUrl from '../../helpers/baseUrl'
import Image from 'next/image'

const Compiled = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const router = useRouter()

  const handelSubmit = async (e)=>{
    console.log('clicked')
    //https://cloudinary.com/v1_1/learnerboy
    e.preventDefault()

     const mediaUrl = await imageUpload()
    try{
          //  const mediaUrl =  await imageUpload()
    const res =  await fetch(`${baseUrl}/api/products`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        price,
        mediaUrl,
        description
      })
    })
    const res2 = await res.json()
    if(res2.error){
      window.alert(res2.error)
    }else{
      window.alert('Product Saved')
      await router.push('/')
    }
    }catch(err){
      console.log(err)
    }
    
    

  }
  const imageUpload = async() =>{
    const data =  new FormData()
         data.append('file',media)
         data.append('upload_preset',"mystore")
         data.append('cloud_name',"learnerboy")
         const res = await fetch("	https://api.cloudinary.com/v1_1/learnerboy/image/upload",{
           method:"POST",
           body:data
         })
         const res2  = await res.json()
         return res2.url

  }
  // const modal = 





  return (
    <div>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center mt-5">
              <div className="mb-3 mb-md-0">
                <h2>Add New Products</h2>
              </div>
            </div>
            <div className="container justify-content-center">
              <form className="mt-5 mb-5" onSubmit={handelSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  {/* <input type="text" className="form-control" /> */}
                  <textarea
                    className="form-control"
                    style={{ height: 200 }}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      setMedia(e.target.files[0])
                    }}
                  />
                </div>
                <div className='container text-center m-3'>

                <Image src={media?URL.createObjectURL(media):""} className="img-fluid henc text-center" alt="..."/>

                </div>
                <div className="text-center mt-5">
                {/* <button type="submit" className="btn btn-primarvimy  mt-4">
                  Submit
                </button> */}
                <button className="genric-btn primary circle large vim">Submit</button>
                
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Compiled;

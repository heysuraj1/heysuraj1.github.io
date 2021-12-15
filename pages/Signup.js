import Link from 'next/link'
import {useState,useEffect} from 'react'
import baseUrl from '../helpers/baseUrl'
import { useRouter } from 'next/router'
import {parseCookies} from 'nookies'


const Cart = () => {
  const {token} = parseCookies()

  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const router  = useRouter()


  useEffect((ctx) => {
    const {token} = parseCookies(ctx)
        if(token){
            router.push('/')
        }
}, [])
let user = false

if (token) {
    user = true
}else{
    user = false
}




  const handelSignup = async (e) =>{
    e.preventDefault()
    console.log({name,email,password})

    const res =   await fetch(`${baseUrl}/api/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })


    const res2 = await res.json()
    if(res2.error){
      // M.toast({html: res2.error,classes:"red"})
      window.alert(res2.error)
    }else{
      // M.toast({html: res2.message,classes:"green"})
      // router.push('/login')
      window.alert('Well Done Account Created')
      await router.push('/Login')

    }

  }


    return (
        <div>
          { user ?
          
          
        
          <div>
          <h3 className='text-center mt-5 mb-5'>You Are Already Logged In , No Need To Create An Account Again</h3>
      </div>
        
        
        :
        <section className="banner_area">
          <div className="banner_inner d-flex align-items-center">
            <div className="container">
              <div className="banner_content d-md-flex justify-content-between align-items-center mt-5">
                <div className="mb-3 mb-md-0">
                  <h2 className='text-center'>Sign Up Here</h2>
                  {/* <span><p>{"Don't Worry We Will Take Care Of Your Privacy, Trust On Us : )"}</p></span> */}
                </div>
                <Link href='/Login' passHref>
                <div className="page_link">
                  Already have an account ?
                </div>
                </Link>
              </div>
        
              <div className="container justify-content-center">
        
                    <form className="mt-5 mb-5" onSubmit={handelSignup}>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input value={email} onChange={(e)=>setemail(e.target.value)}  type="email" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" className="form-control" />
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        
        
              </div>
            </div>
          </div>
        </section>
        
        
        
        
        
        
        }
            

        </div>
    );
}

export default Cart;
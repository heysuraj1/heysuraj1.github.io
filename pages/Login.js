import Link from 'next/link'
import {useState} from 'react'
import baseUrl from '../helpers/baseUrl'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {parseCookies} from 'nookies'



const Login = () => { 


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let router = useRouter()
  const {token} = parseCookies()

    // const [allowed, setAllowed] = useState(false)
  
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

  const handelLogin = async (e) =>{

    // e.preventDefault()
    // console.log(email,password)
    // const res =  await fetch(`${baseUrl}/api/login`,{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify({
    //     email,
    //     password
    //   })
    // })
    // const res2 = await res.json()
    // if(res2.error){
    //   // M.toast({html: res2.error,classes:"red"})
    //   window.alert(res2.error)
    // }else{
    //   window.alert('Ok done ji aao')
    //    console.log(res2)
    //    cookie.set('token',res2.token)
    //    cookie.set('user',res2.user.name)
    //    cookie.set('userE',res2.user.email)
    //    cookie.set('userR',res2.user.role)
    //    router.push('/')
    // }
    e.preventDefault()
    const res =  await fetch(`${baseUrl}/api/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    })

    const res2 = await res.json()
    if(res2.error){
      console.log('Something error occured')
    }else{
       console.log(res2)
       cookie.set('token',res2.token)
       cookie.set('user',res2.user.name)
       cookie.set('userE',res2.user.email)
       cookie.set('userR',res2.user.role)
       router.push('/Account')
    }


  }








    return (
        <div>
          { user ? 
          <div>
          <h3 className='text-center mt-5 mb-5'>You Are Already Logged In , No Need To Do It Again</h3>
      </div>

          
        
        
        :
        <section className="banner_area">
  <div className="banner_inner d-flex align-items-center">
    <div className="container">
      <div className="banner_content d-md-flex justify-content-between align-items-center mt-5">
        <div className="mb-3 mb-md-0">
          <h2>Log In Here</h2>

        </div>
        <Link href='/Signup' passHref>
        <div className="page_link">
          {"Don't have an account ?"}
        </div>
        </Link>
      </div>
      <div className="container justify-content-center">

            <form className="mt-5 mb-5" onSubmit={handelLogin}>
       
        <div className="mb-3">
            <label  className="form-label">Email address</label>
            <input value={email}
            onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input value={password}
            onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" />
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

export default Login;
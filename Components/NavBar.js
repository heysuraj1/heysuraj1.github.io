import Link from 'next/link'
import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'

const NavBar = () => {
  
  const router = useRouter()
    // const cookieuser = parseCookies()
  const cook = parseCookies();

   
    const user = cook.user ? JSON.stringify(cook.user) : "";
    const userE = cook.userE ? JSON.stringify(cook.userE) : "";
    const userR = cook.userR ? JSON.stringify(cook.userR) : "";


    function isActive(route) {
        if (route == router.pathname) {
            return "acto"
        }
        else return ""
    }


    return (
        <div>
            <ul className="nav  bg-dark">
  <li className="nav-item">
  <Link href="/" className='justify-content-start'>
    <a className="nav-link active justify-content-center" aria-current="page" >My Store.com</a>
    </Link>

  </li>
  <li className="nav-item">
  <Link href="/">
    <a className={`nav-link ciao ${isActive('/')}`} >Home</a>
    </Link>
  </li>
  <li className="nav-item">
  <Link href="/Cart">
    <a className={`nav-link ciao ${isActive('/Cart')}`} >Cart</a>
    </Link>

  </li>
 





  {
    !user ? 
    <>
  <li className="nav-item">
  <Link href="/Login">
    <a className={`nav-link ciao ${isActive('/Login')}`}>Login</a>
    </Link>

  </li>
  <li className="nav-item">
  <Link href="/Signup">
    <a className={`nav-link ciao ${isActive('/Signup')}`}>Sign Up</a>
    </Link>

  </li>


  
  </>    
    :
    <>
    <li className="nav-item">
  <Link href="/Account">
    <a className={`nav-link ciao ${isActive('/Account')}`}>Account</a>
    </Link>

  </li>
  {userR == '"admin"'  && userE == '"Suraj@gmail.com"' && user == '"Suraj Singh"'? 
  
  <li className="nav-item">
  <Link href="/Create">
    <a className={`nav-link ciao ${isActive('/Create')}`}>Admin</a>
    </Link>

  </li>
  
  
  :
  ""

  }
    
    <li className="nav-item">
 
    <button className='btn btn-primary' onClick={()=>{
                cookie.remove('token')
                cookie.remove('user')
                cookie.remove('userE')
                cookie.remove('userR')
                router.push('/Login')
              }} >Logout</button>
  </li>
  
  </>
    
  }
  

 
  
</ul>


        </div>
    );
}

export default NavBar;
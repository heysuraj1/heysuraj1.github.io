import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

const SideBar = () => {
  let router = useRouter()


  
  function isActive(route) {
    if(route == router.pathname){
      return 'active'

    }else ''
  }

    return (
        <div className="justify-content-start">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280,height:820}}>
  <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
    <svg className="bi me-2" width={40} height={26}><use xlinkHref="#bootstrap" /></svg>
    <span className="fs-4">My Store</span>
  </a>
  <hr />
  <ul className="nav nav-pills flex-column mb-auto">
    
    <li>
      <Link href='/AdminPanel/Routes/DashBoard'>
      <a  className={`nav-link text-white ${isActive('/AdminPanel/Routes/DashBoard')}`}>
        <svg className="bi me-2" width={16} height={26}><use xlinkHref="#speedometer2" /></svg>
        Dashboard
      </a>
      </Link>
    </li>
    <li>
    <Link href='/AdminPanel/Routes/addProduct'>
      <a  className={`nav-link text-white ${isActive('/AdminPanel/Routes/addProduct')}`}>
        <svg className="bi me-2" width={16} height={26}><use xlinkHref="#table" /></svg>
        Add Product
      </a>
      </Link>

    </li>
    <li>
    <Link href='/AdminPanel/Routes/customers'>
      <a  className={`nav-link text-white ${isActive('/AdminPanel/Routes/customers')}`}>
        <svg className="bi me-2" width={16} height={26}><use xlinkHref="#grid" /></svg>
        Customers
      </a>
    </Link>

    </li>
    <li>
    <Link href='/AdminPanel/Routes/payment'>
      <a  className={`nav-link text-white ${isActive('/AdminPanel/Routes/payment')}`}>
        <svg className="bi me-2" width={16} height={26}><use xlinkHref="#people-circle" /></svg>
        Payment
      </a>
    </Link>

    </li>
  </ul>
  <hr />
  <div className="dropdown">
    <a  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
      <Image alt='' src="https://github.com/mdo.png"  width={32} height={32} className="rounded-circle me-2" />
      <strong>mdo</strong>
    </a>
    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1" style={{}}>
      <li><a className="dropdown-item" href="#">New project...</a></li>
      <li><a className="dropdown-item" href="#">Settings</a></li>
      <li><a className="dropdown-item" href="#">Profile</a></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a className="dropdown-item" href="#">Sign out</a></li>
    </ul>
  </div>
</div>
</div>

    );
}

export default SideBar;
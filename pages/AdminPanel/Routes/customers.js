import SideBar from '../SideBar'
import UserRoles from './userRoles';

// import userRoles from './userRoles';

const customers = () => {
    return (
        <div>
                <div className="row">
                <div className="col">
                <SideBar/>
                </div>
                <div className="col-9">
                    <div className='container mt-5'>
                <UserRoles/>                    

                    </div>
                </div>
                
                </div>

        </div>
    );
}

export default customers;
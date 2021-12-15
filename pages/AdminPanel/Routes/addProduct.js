import Compiled from "../Compiled";
import SideBar from "../SideBar";


const addProduct = () => {
    return (
        // <div>
        //     <div >
        //         <div className="row row-cols-2 row-cols-sm-1 row-cols-md-2">
        //             <div className="col"><SideBar/></div>
        //             {/* <div className="col">Hey</div> */}
        //             <div className="col">
        //                 <div className="justify-content-center">
        //                 <Compiled/>

        //                 </div>
        //             </div>
        //         </div>
        //         </div>



        // </div>
        <div>
                <div className="row">
                <div className="col">
                <SideBar/>
                </div>
                <div className="col-9">
                    {/* <div className='container'> */}
                    <Compiled/>    

                    {/* </div> */}
                </div>
                
                </div>

        </div>
    );
}

export default addProduct;
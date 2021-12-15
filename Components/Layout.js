import Footer from "./Footer";
import NavBar from "./NavBar";


const layout = ({children})=>{
    return(
        <>
        <NavBar/>
        {children}
        <Footer/>


        </>
    )
}

export default layout;
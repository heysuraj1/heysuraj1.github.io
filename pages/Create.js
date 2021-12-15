import Head from "next/head";
import Compiled from "./AdminPanel/Compiled";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideBar from "./AdminPanel/SideBar";
import DashBoard from "../pages/AdminPanel/Routes/DashBoard";

const Create = () => {
  const { token } = parseCookies();

  // const [allowed, setAllowed] = useState(false)
  const router = useRouter();
  useEffect((ctx) => {
    const { token } = parseCookies(ctx);
    if (!token) {
      router.push("/");
    }
  }, []);
  let user = false;

  if (token) {
    user = true;
  } else {
    user = false;
  }

  return (
    <div>
      {user ? (
        <>
          <DashBoard />
        </>
      ) : (
        <div>
          <h3 className="text-center mt-5 mb-5">Method Not Allowed</h3>
        </div>
      )}
    </div>
  );
};

// export async function getServerSideProps() {
//     const {token} = parseCookies(ctx)
//     if(!token){
//         const {res} = ctx
//         res.writeHead(302,{Location:'/Login'})
//         res.end()

//     }
//     return {
//       props: {}
//     }
//   }

export default Create;

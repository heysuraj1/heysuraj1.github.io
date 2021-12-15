import baseUrl from '../helpers/baseUrl'
import { parseCookies } from "nookies";
// import { useRouter } from 'next/router'

// userE
// userR

const Account = ({ order }) => {
  console.log("SPNWH");
  console.log({ order });


//   if(order.lenght == 0){
//       return (
//           <div className="container">
//               <h3 className="text-center">You have not purchased anything yet</h3>

//           </div>
//       )
//   }

  const cookie = parseCookies();

  //Below Is JUGAAD <=======<< LOL
  const user = cookie.user ? JSON.stringify(cookie.user) : "";
  const userE = cookie.userE ? JSON.stringify(cookie.userE) : "";
  const userR = cookie.userR ? JSON.stringify(cookie.userR) : "";
  console.log({user})

  const OrderHistory = () => {
    return (
      <div>
        {/* {
                Object.keys(res2).map(hit =>{
                    return <h1 key={hit._id}>{hit.product}</h1>
                })
            }
             */}
        <div className="accordion accordion-flush" >
          {order.map((item) => {
            
            return (
              <div key={item._id}>
                <div className="accordion-item">
                  <h2 className="accordion-header" >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      {item.createdAt}
                    </button>
                  </h2>
                  <div
                   
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      {item.products.map(pitem =>{
                          return <h5 key={pitem.product.name}>{pitem.product.name}  X  
                         {pitem.quantity} , Price {pitem.product.price}
                         
                         
                         </h5>
                         
                         
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h5>Purchase History</h5>
      <div className="container mt-4 mb-5">
        <h4 className="text-center">
          {" "}
          Hey {user} here is your Purchase History

        </h4>
      </div>

     
      <div className="container mt-4 mb-5">
      {
            order.length == 0?
              <div className="container ">
                    <h5 className="text-center">Your have no order History</h5>
                </div>
            :
            <OrderHistory />
            }
          
          
          </div>
     
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // const router = useRouter()

  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;

    //   <=======<<   Below code explains how to redirect inside getServerSideProps
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const res = await fetch(`${baseUrl}/api/Orders`, {
    headers: { Authorization: token },
  });
  const res2 = await res.json();
  console.log(res2);

  return {
    props: { order: res2 },
  };
}

export default Account;
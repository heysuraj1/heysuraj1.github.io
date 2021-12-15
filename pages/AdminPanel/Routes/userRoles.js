import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import baseUrl from "../../../helpers/baseUrl";

function UserRoles() {
  const [users, setUsers] = useState([]);
  const { token } = parseCookies();
  useEffect(() => {


    const fetchUser = async () => {
      const res = await fetch(`${baseUrl}//api/users`, {
        headers: {
          Authorization: token,
        },
      });
      const res2 = await res.json();
      console.log(res2);
      setUsers(res2);
    };




    fetchUser();
  }, []);


  const handelRole = async (_id, role) => {
    const res = await fetch(`${baseUrl}//api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        _id,
        role,
      }),
    });
    const res2 = await res.json();
    console.log(res2);
    // setUsers(res2)
    const updatesUsers = users.map((user) => {
      if (user.role != res2.role && user.email == res2.email) {
        return res2;
      } else {
        return user;
      }
    });
    setUsers(updatesUsers);
  };

  // if (condition) {

  // } else {

  // }

  return (
    <>
      <h1>{"My Customer's"}</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => {
              return (
                <tr key={item._id}>
                  <td scope="col">{item.name}</td>
                  <td scope="col">{item.email}</td>
                  <td
                    scope="col"
                    onClick={() => handelRole(item._id, item.role)}
                  >
                    {item.role}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserRoles;

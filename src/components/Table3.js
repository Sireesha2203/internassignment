import React,{useState,useEffect} from 'react';

function Table3() {
  //state
  let [users,setUsers]=useState([]);
  //fetching
  useEffect(()=>{
    const getUsers = async () => {
      try {
        await fetch("http://localhost:3500/user-api/get-users-3")
        .then(response=>response.json())
        .then(userData=>setUsers(userData.payload))
        .catch(err=>console.log(err))
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  },[])
  return (
    <div className="text-center container c2 mt-5">

    <h3 className='header'>Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name</h3>

      <table className="bg table table-striped">
        <thead className="text-dark">
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Income</th>
            <th>City</th>
            <th>Car</th>
            <th>Quote</th>
            <th>Phone Price</th>
          </tr>
        </thead>
        <tbody >
          {
            users?.map((userObj)=>
              <tr key={userObj.id}>
                <td>{userObj.id}</td>
                <td>{userObj.first_name}</td>
                <td>{userObj.last_name}</td>
                <td>{userObj.email}</td>
                <td>{userObj.gender}</td>
                <td>{userObj.income}</td>
                <td>{userObj.city}</td>
                <td>{userObj.car}</td>
                <td>{userObj.quote}</td>
                <td>{userObj.phone_price}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table3
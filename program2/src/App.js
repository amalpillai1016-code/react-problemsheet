import { useEffect, useState } from "react"; import axios from "axios"; import "./App.css"; 
 
function App() {   const [users, setUsers] = useState([]);   const [loading, setLoading] = useState(true); 
 
  useEffect(() => {     axios 
      .get("https://jsonplaceholder.typicode.com/users") 
      .then((response) => {         setUsers(response.data);         setLoading(false); 
      }) 
      .catch((error) => {         console.error("Error fetching data:", error);         setLoading(false); 
      }); 
  }, []); 
 
  return ( 
    <div className="container"> 
      <h1 className="title">User Data Table</h1> 
 
      {loading ? ( 
        <div className="loader">Loading data...</div> 
      ) : ( 
        <table className="table"> 
          <thead> 
            <tr> 
              <th>ID</th> 
              <th>Name</th> 
              <th>Email</th> 
              <th>City</th> 
              <th>Company</th> 
            </tr> 
          </thead> 
          <tbody> 
            {users.map((user) => ( 
              <tr key={user.id}> 
                <td>{user.id}</td> 
                <td>{user.name}</td> 
                <td>{user.email}</td> 
                <td>{user.address.city}</td> 
                <td>{user.company.name}</td> 
              </tr> 
            ))} 
          </tbody> 
        </table> 
      )} 
    </div> 
  ); 
} 
 
export default App; 

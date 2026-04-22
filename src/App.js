import { useEffect, useState } from "react"; import "./App.css"; 
 
function App() {   const [users, setUsers] = useState([]);   const [loading, setLoading] = useState(true); 
 
  useEffect(() => {     fetch("https://jsonplaceholder.typicode.com/users") 
      .then((res) => res.json()) 
      .then((data) => {         setUsers(data);         setLoading(false); 
      }) 
      .catch((err) => {         console.error("Error:", err);         setLoading(false); 
      }); 
  }, []); 
 
  return ( 
    
  <div className="container"> 
      <h1 className="title">User List</h1> 
 
      {loading ? ( 
        <div className="loader">Loading...</div> 
      ) : ( 
        <div className="card-container"> 
          {users.map((user) => ( 
            <div className="card" key={user.id}> 
              <h2>{user.name}</h2> 
              <p><strong>Email:</strong> {user.email}</p> 
              <p><strong>City:</strong> {user.address.city}</p> 
            </div> 
          ))} 
        </div> 
      )} 
    </div> 
  ); 
} 
 
export default App; 

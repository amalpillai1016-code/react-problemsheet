import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://jsonplaceholder.typicode.com/users";
  // 👉 You can also use:
  // const API_URL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Program 1 - Fetch API</h1>

      {/* 🔄 Loading */}
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {/* For USERS */}
              {item.name} - {item.email}

              {/* For POSTS (if you use posts API) */}
              {/* {item.title} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
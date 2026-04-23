import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://jsonplaceholder.typicode.com/users"; 
  // ❌ try wrong URL to test:
  // const API_URL = "https://jsonplaceholder.typicode.com/invalid";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid API or Server Error");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("⚠️ Failed to load data. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>API Error Handling</h1>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Data */}
      {!loading && !error && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
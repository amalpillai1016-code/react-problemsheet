import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.slice(0, 5)); // show only 5 items
        setLoading(false);
      })
      .catch((err) => {
        setError("❌ Failed to load data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Program 5 - State Management</h1>

      {/* 🔄 Loading State */}
      {loading && <p>🔄 Loading data...</p>}

      {/* ❌ Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Success State */}
      {!loading && !error && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
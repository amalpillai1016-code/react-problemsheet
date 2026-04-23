import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // READ (GET)
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setPosts(res.data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // CREATE (POST)
  const handleCreate = () => {
    axios.post(API_URL, { title, body })
      .then((res) => {
        setPosts([res.data, ...posts]);
        setTitle("");
        setBody("");
      })
      .catch((err) => console.error(err));
  };

  // UPDATE (PUT)
  const handleUpdate = () => {
    axios.put(`${API_URL}/${editId}`, { title, body })
      .then((res) => {
        setPosts(posts.map((p) => (p.id === editId ? res.data : p)));
        setEditId(null);
        setTitle("");
        setBody("");
      })
      .catch((err) => console.error(err));
  };

  // DELETE
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setPosts(posts.filter((p) => p.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // EDIT
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD App (Posts)</h1>

      {/* FORM */}
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Enter body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br /><br />

      {editId ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleCreate}>Create</button>
      )}

      <hr />

      {/* DATA */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button onClick={() => handleEdit(post)}>Edit</button>
                  <button onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
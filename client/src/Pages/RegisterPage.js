import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // if (response.ok) {
    //     setMessage('Registration successful!');
    // } else {
    //     const error = await response.json();
    //     setMessage(`Error: ${error.message || 'Registration failed'}`);
    // }
    if (response.status === 201) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
    // console.log(response);
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Register</button>
      {/* {message && <p>{message}</p>} */}
    </form>
  );
}

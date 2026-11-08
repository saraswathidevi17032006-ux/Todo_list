import { useState } from "react";
import { FaClipboardCheck, FaUser, FaLock } from "react-icons/fa";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <form className="login-form glass-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <FaClipboardCheck size={42} />
        </div>
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to manage your executive agenda</p>
        
        <div className="input-group">
          <label>Username</label>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="login-btn btn-gradient">
          Enter Workspace
        </button>
      </form>
    </div>
  );
}

export default Login;

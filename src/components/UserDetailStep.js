import React from 'react'
import { Link } from "react-router-dom";
const UserDetailStep = ({name, setName, email, setEmail, password, setPassword, hidePassword, setHidePassword, handleUserDetails}) => {
  
  return (
    <div className="form-step user-details active">
      <h2>Register</h2>
      <div className="entry">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="entry">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password entry">
        <input
          type={hidePassword ? "password" : "text"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="toggle-password-visibility"
          type="button"
          onClick={() => {
            setHidePassword((prev) => !prev);
          }}
        >
          {hidePassword ? (
            <img src="/visible.png" alt="" />
          ) : (
            <img src="/not-visible.png" />
          )}
        </button>
      </div>
      <div className="control">
        <button onClick={handleUserDetails}>
          <img src="right.png" alt="back" />
        </button>
      </div>
      <section className="redirection">
        <p>Already have a account?</p>
        <Link to="/login">Login</Link>
      </section>
    </div>
  );
}

export default UserDetailStep

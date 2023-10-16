import React, {useState} from 'react'
import useAuthUpdateContext from '../hooks/useAuthUpdateContext';
import Toast from '../components/Toast';
import {Link} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const {addUser} = useAuthUpdateContext()
    
  async function loginUser(e){
    e.preventDefault()
    if(email === "" || password === ""){
      return setErrorMsg("All fields are required")
    }
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json()
      if(response.ok){
        const {token, user} = data
        addUser(user)
        localStorage.setItem("CHAT_TOKEN", token)
      }else{
        setErrorMsg(data.error)
      }
    } catch (error) {
      console.log(error);
    }
    

  }
  return (
    <div className="form-background">
      <div className="form-container login-form-container">
        <form className="form login-form" onSubmit={loginUser}>
          <h2>Login</h2>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
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
            <button>Login</button>
          </div>
          {errorMsg && (
            <Toast
              logo="error.png"
              messageType="Error"
              message={errorMsg}
              closeToast={() => {
                setErrorMsg(null);
              }}
            />
          )}
        </form>
        <section className="redirection">
          <p>Do not have a account?</p>
          <span>
            <Link to="/register">Registration</Link>
          </span>
        </section>
      </div>
    </div>
  );
}

export default Login

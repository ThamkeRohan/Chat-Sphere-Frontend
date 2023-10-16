import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import './App.css'
import useAuthContext from './hooks/useAuthContext';
import { useEffect, useState } from 'react';
import Animation from './components/Animation';
function App() {
  const {user} = useAuthContext()
  const [showAnimation, setShowAnimation] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
  },[])
  return (
    <div className="app">
      {showAnimation && <Animation isStartUpAnimation={true} />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={user != null ? <Home /> : <Login />}></Route>
          <Route
            path="/login"
            element={user == null ? <Login /> : <Home />}
          ></Route>
          <Route
            path="/register"
            element={user == null ? <Register /> : <Home />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

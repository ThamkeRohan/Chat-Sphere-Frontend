import React, { useRef, useState } from 'react'
import useAuthUpdateContext from '../hooks/useAuthUpdateContext'
import useLocalStorage from '../hooks/useLocalStorage'
import Toast from '../components/Toast'
import UserDetailStep from '../components/UserDetailStep'
import UserProfileStep from '../components/UserProfileStep'
import OtpStep from '../components/OtpStep'

const Register = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOpt] = useState("")
    const [profileImage, setProfileImage] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const {addUser} = useAuthUpdateContext()
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    function nextStep(e){
      setCurrentStep(prev => prev + 1)
    }
    function prevStep(e) {
      setCurrentStep((prev) => prev - 1);
    }
    function handleUserDetails(e){
      e.preventDefault()
      if(name === "" || email === "" || password === ""){
          return setErrorMsg("All fields are required")
      }
      nextStep()
    }
    async function verifyUser(e){
      e.preventDefault()
      try {
        const response = await fetch("http://localhost:5000/api/users/verify", {
          method: "POST",
          headers:{
            "content-Type": "application/json"
          },
          body: JSON.stringify({ email, otp }),
        });
        const data = await response.json();
        if (!response.ok) {
          const { error } = data;
          setErrorMsg(error);
        }
        const { token, user } = data;
        addUser(user)
        localStorage.setItem("CHAT_TOKEN", token)
      } catch (error) {
        console.log(error);
        setErrorMsg(error);
      }
    }

    async function registerUser(e){
        e.preventDefault()
        setIsLoading(true)
        const user = new FormData()
        if(name === "" || email === "" || password === "" || profileImage.length === 0){
          setErrorMsg("All fields are required")
          setIsLoading(false)
          return
        }
        
        user.append('name', name)
        user.append('email', email)
        user.append('password', password)
        user.append('profileImage', profileImage[0])

        try{
            const response = await fetch('http://localhost:5000/api/users/register',{
                method: "POST",
                body: user
            })
           const data = await response.json()
           if(!response.ok){
              const { error } = data;
              setErrorMsg(error)
              setIsLoading(false);
              return
           }
           nextStep();
           setIsLoading(false)
        }catch(error){
            console.log(error);
            setErrorMsg(error)
        }
        
    }
  return (
    <div className="form-background">
      <div className="form-container register-form-container">
        <form onSubmit={registerUser} className="form register-form">
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
          {currentStep === 1 && (
            <UserDetailStep
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
              handleUserDetails={handleUserDetails}
            />
          )}
          {currentStep === 2 && (
            <UserProfileStep
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              registerUser={registerUser}
              prevStep={prevStep}
              isLoading={isLoading}
            />
          )}
          {currentStep === 3 && (
            <OtpStep otp={otp} setOpt={setOpt} verifyUser={verifyUser} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Register

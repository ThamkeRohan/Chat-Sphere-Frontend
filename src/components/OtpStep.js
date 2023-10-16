import React from 'react'

const OtpStep = ({otp, setOpt, verifyUser}) => {
  return (
    <div className="form-step otp">
      <h2>Verify OTP</h2>
      <div className="entry">
        <input type="text" placeholder="OTP" value={otp} onChange={e => setOpt(e.target.value)} />
      </div>
      <div className="control">
        <button onClick={verifyUser}>Verify</button>
      </div>
    </div>
  );
}

export default OtpStep

import React, { useState } from 'react'

import OtpTimer from 'otp-timer'
import OtpInput from 'react-otp-input';

const Otpveify = () => {
  const [state,setState] = useState({otp:""})
   

  const  handleOtp = (otp) => setState({ otp });

  return (
    <div className="mt-3 ">
            <OtpInput
              inputStyle={{
                width: "2rem",
                height: "2rem",
                margin: "20px 0.25rem",
                fontSize: "2rem",
                borderRadius: 4,
                border: "1px solid #051b34",
              }}
              isInputNum={true}
              shouldAutoFocus={true}
              className="text-blue-500 p-5"
              value={state.otp}
              onChange={(e) => {
                handleOtp(e);
              }}
              numInputs={6}
            />
            <div className="flex justify-between">
              <OtpTimer
                seconds={30}
                minutes={0}
                ButtonText="Resend OTP"
                buttonColor={"black"}
                background={"none"}
                // resend={handleResend}
              />
            </div>
          </div>
  )
}

export default Otpveify



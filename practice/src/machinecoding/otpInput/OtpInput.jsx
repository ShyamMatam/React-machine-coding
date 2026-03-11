import React, { useState, useRef } from "react";

const OtpInput = ({ length = 6 }) => {

  // Store OTP digits
  const [otp, setOtp] = useState(Array(length).fill(""));

  // Store input references for focus control
  const inputRefs = useRef([]);

  // Move focus to next input
  const focusNextInput = (index) => {
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Move focus to previous input
  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle input change
  const handleInputChange = (event, index) => {
    const value = event.target.value;

    // Allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // Move to next input if value entered
    if (value !== "") {
      focusNextInput(index);
    }
  };

  // Handle keyboard actions
  const handleKeyDown = (event, index) => {

    if (event.key === "Backspace" && otp[index] === "") {
      focusPreviousInput(index);
    }
  };

  // Handle paste event
  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("text");

    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, length).split("");

    const updatedOtp = [...otp];

    digits.forEach((digit, i) => {
      updatedOtp[i] = digit;
    });

    setOtp(updatedOtp);
  };

  return (
    <div
      style={{ display: "flex", gap: "10px" }}
      onPaste={handlePaste}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}

          ref={(el) => (inputRefs.current[index] = el)}

          onChange={(event) => handleInputChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}

          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "18px",
            border: "1px solid #ccc",
            borderRadius: "6px"
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
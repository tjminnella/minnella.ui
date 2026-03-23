import { useState, useEffect, useRef } from 'react';

export const OTPGenerator = () => {
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const timerRef = useRef(0);

    const generateOTP = () => {
        // Generate a 6-digit OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(newOtp);
        setTimeLeft(5);
        setIsCountingDown(true);
    };

    useEffect(() => {
        if (isCountingDown && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isCountingDown) {
            // Timer expired
            setIsCountingDown(false);
        }

        return () => clearTimeout(timerRef.current);
    }, [timeLeft, isCountingDown]);

    const handleButtonClick = () => {
        generateOTP();
    };

    // Determine the message for the OTP display
    const otpDisplayMessage = otp ? otp : "Click 'Generate OTP' to get a code";

    // Determine timer message
    let timerMessage = "";
    if (isCountingDown) {
        timerMessage = `Expires in: ${timeLeft} seconds`;
    } else if (otp && timeLeft === 0) {
        timerMessage = "OTP expired. Click the button to generate a new OTP.";
    } else {
        timerMessage = "";
    }

    return (
        <div className="container">
            <h1 id="otp-title">OTP Generator</h1>
            <h2 id="otp-display">{otpDisplayMessage}</h2>
            {/* Show the timer message if it exists */}
            <p id="otp-timer" aria-live="assertive">{timerMessage}</p>

            <button
                id="generate-otp-button"
                onClick={handleButtonClick}
                disabled={isCountingDown}
            >
                Generate OTP
            </button>
        </div>
    );
};
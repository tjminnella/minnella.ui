import { useState, useEffect } from 'react';


const CountdownTimer = ({ initialTime = 5000 }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => (prev > 0 ? prev - 1000 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <p>Time left: {timeRemaining / 1000} seconds</p>
        </div>
    );
};

export default CountdownTimer;
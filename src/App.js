import React, { useState, useEffect } from 'react';
import './app2.css';

function App() {
    useEffect(() => {
        document.title = "Booking System";
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const difference = (end - start) / (1000 * 60 * 60); 

        if (difference <= 0 || difference > 2) {
            setError("The booking duration must be within 2 hours.");
            return;
        }

        setError(''); 

        const bookingData = { name, email, date, startTime, endTime };

        
        fetch('/submit', {method: 'POST', headers: {'Content-Type': 'application/json', },body: JSON.stringify(bookingData),}). then(response => response.json()).then(data => {
                console.log('Success:', data);
                
                window.location.href = "/Confirmation"; 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src="https://pawsey.org.au/wp-content/themes/project/img/pawsey-logo-beige.png" alt="Pawsey Logo" />
                <h1>Booking System</h1>
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Name:</label> <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group"> <label>Email:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group"> <label>Date:</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Start Time:</label> <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>End Time:</label> <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Request Booking</button>
                </form>
            </header>
        </div>
    );
}

export default App;
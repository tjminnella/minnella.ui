import { useState } from 'react'

export function EventRSVPForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [attendees, setAttendees] = useState(1);
    const [dietary, setDietary] = useState('');
    const [bringingGuests, setBringingGuests] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Email validation regex (simple)
    const isValidEmail = (email:string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e:any) => {
        e.preventDefault();

        // Validation: required fields
        if (!name.trim()) {
            alert('Name is required');
            return;
        }
        if (!email.trim() || !isValidEmail(email)) {
            alert('Valid email is required');
            return;
        }
        if (attendees < 1) {
            alert('Number of attendees must be at least 1');
            return;
        }

        setSubmitted(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name (required):{' '}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Email (required):{' '}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Number of attendees (required):{' '}
                        <input
                            type="number"
                            min="1"
                            value={attendees}
                            onChange={(e) => setAttendees(Number(e.target.value))}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Dietary preferences (optional):{' '}
                        <input
                            type="text"
                            value={dietary}
                            onChange={(e) => setDietary(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Bringing additional guests:{' '}
                        <input
                            type="checkbox"
                            checked={bringingGuests}
                            onChange={(e) => setBringingGuests(e.target.checked)}
                        />
                    </label>
                </div>

                <button type="submit">Submit RSVP</button>
            </form>

            {submitted && (
                <div style={{ marginTop: '1rem' }}>
                    <h2>RSVP Submitted!</h2>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Number of attendees: {attendees}</p>
                    <p>Dietary preferences: {dietary ? dietary : 'None'}</p>
                    <p>Bringing additional guests: {bringingGuests ? 'Yes' : 'No'}</p>
                </div>
            )}
        </>
    );
}

export default EventRSVPForm;
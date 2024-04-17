import React, { useState } from 'react';
import { postData } from '../../service/http';

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = async () => {
        try {
            const response = await postData('/SignUp', { email, password });

            console.log({ email, password });
            
            if (!response.ok) {
                throw new Error('Network response was not ok. Status: ' + response.status);
            }
    
            if (response.headers.get("Content-Type")?.includes("application/json")) {
                const result = await response.json(); // Converts the response to JSON
                alert(result.message); // Assuming the message is part of the JSON response
            } else {
                // If not JSON, handle or show error differently
                const text = await response.text(); // Reading response as text to check what it is
                console.error('Non-JSON response:', text);
                alert("Received non-JSON response from the server.");
            }
        } catch (error) {
            console.error('Signup Error:', error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };
    
    

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default Signup;

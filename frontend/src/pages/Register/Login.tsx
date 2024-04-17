import React, { useState } from 'react';
import { postData } from '../../service/http';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const response = await postData('/SignIn', { email, password });
    
            if (!response.ok) {
                // Handle non-2xx responses here
                const errorData = await response.json();
                alert(errorData.message);
                return; // Stop further execution in case of error response
            }
    
            const result = await response.json();
            localStorage.setItem('token', result.access_token); // Assuming the token is stored in result.access_token
            alert(result.message);
            // Optionally redirect the user or update global state here
    
        } catch (error) {
            console.error('Login error:', error);
            alert("An unexpected error occurred");
        }
    };
    

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
};

export default Login;

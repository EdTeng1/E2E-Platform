import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://ec2-54-89-164-62.compute-1.amazonaws.com:5000/SignIn', { email, password });
            localStorage.setItem('token', res.data.access_token); // Assuming the token is stored in res.data.access_token
            alert(res.data.message);
            // Optionally redirect the user or update global state here
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message);
            } else {
                alert("An unexpected error occurred");
            }
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

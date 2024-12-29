"use client"; // เพิ่มบรรทัดนี้

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter(); // ใช้ useRouter จาก next/router

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // บันทึก token ลงใน localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token);
            }
            console.log('ok');
            // เปลี่ยนเส้นทางไปยังหน้า Dashboard
            router.push('/dashboard'); // ใช้ router.push จาก next/router
        } else {
            setError(data.error || 'Something went wrong');
        }
    };

    return (
        <div className=''>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        className=''
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        className=''
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage;

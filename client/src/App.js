import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('female');
    const [tempUserId, setTempUserId] = useState(null);

    const register = async () => {
        if (!name || !email || !password || !mobile || !address || !gender) {
            alert('Please enter all fields');
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/user/storedata", {
                name: name,
                email: email,
                password: password,
                mobile: mobile,
                address: address,
                gender: gender
            });

            if (response?.data?.success) {
                setTempUserId(response.data.tempUserId); // Save tempUserId for polling
                alert('Please wait for some minutes.');
                pollStatus(response.data.tempUserId); // Start polling
            } else {
                alert(response?.data?.message);
            }
        } catch (error) {
            alert('Error processing request. Please try again later.');
            console.error(error);
        }
    };

    const pollStatus = (tempUserId) => {
        const intervalId = setInterval(async () => {
            try {
                const statusResponse = await axios.get(`http://localhost:3000/user/status/${tempUserId}`);
                if (statusResponse?.data?.status === 'verified') {
                    clearInterval(intervalId);
                    alert('Data has been stored successfully.');
                } else if (statusResponse?.data?.status === 'denied') {
                    clearInterval(intervalId);
                    alert('Data storage has been denied.');
                }
            } catch (error) {
                clearInterval(intervalId);
                alert('Error checking status. Please try again later.');
                console.error(error);
            }
        }, 5000); // Poll every 5 seconds
    };

    return (
        <div className="signup">
            <form className="main-container">
                <h1 className="text-center">Register form</h1>

                <div>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        placeholder="Enter your name"
                        id='name'
                        value={name}
                        className="input-form"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        placeholder="Enter your email"
                        id='email'
                        value={email}
                        className="input-form"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        placeholder="Enter your password"
                        id='password'
                        value={password}
                        className="input-form"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='mobile'>Mobile No.:</label>
                    <input
                        type='text'
                        placeholder="Enter your mobile number"
                        id='mobile'
                        value={mobile}
                        className="input-form"
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='address'>Address:</label>
                    <input
                        type='text'
                        placeholder="Enter your address"
                        id='address'
                        value={address}
                        className="input-form"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="radio"
                        name="gender"
                        id="male"
                        className="gender"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                    />
                    <label htmlFor="male">Male</label>

                    <input
                        type="radio"
                        name="gender"
                        id="female"
                        className="gender"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                    />
                    <label htmlFor="female">Female</label>
                </div>

                <button type="button" className="btn signup-btn" onClick={register}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default App;

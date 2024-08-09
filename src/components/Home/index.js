import { useNavigate } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';


const Home = () => {
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userDetails');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
        else {
            navigate('/login', {replace: true});
        }
    }, []);

    return (
        <div className="home-page__main-container">
            <div className="home-page__main-header">
                <h1>Welcome, {userDetails?.user_firstname}!</h1>
            </div>
            <div className="user-details-card">
                <h2>Your Details</h2>
                <p><strong>First Name:</strong> {userDetails?.user_firstname}</p>
                <p><strong>Last Name:</strong> {userDetails?.user_lastname}</p>
                <p><strong>Email:</strong> {userDetails?.user_email}</p>
                <p><strong>Phone:</strong> {userDetails?.user_phone}</p>
                <p><strong>City:</strong> {userDetails?.user_city}</p>
                <p><strong>Zipcode:</strong> {userDetails?.user_zipcode}</p>
            </div>
        </div>
    );
}


export default Home;
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import { IoEye, IoEyeOffSharp } from "react-icons/io5";


const Login = () => {
    const [form, setForm] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
    const [backendErr, setBackendErr] = useState({showErr: false, errMsg: ""});

    const navigate = useNavigate();

    useEffect(() => {
        formValidation(form);
    }, [form]);

    const formValidation = (form) => {
        if (
            form.email !== "" && 
            form.password !== "" 
        ) {
            setDisableSubmitBtn(false);
        } else {
            setDisableSubmitBtn(true);
        }
    }
    
    const handleOnChangeInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log(form);

        try {
            const url = "https://syoft.dev/Api/userlogin/api/userlogin";
            const payload = {
                user_email: form.email,
                user_password: form.password
            }
    
            const options = {
                method: 'POST',
                headers: {
                    "Contetnt-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
            
            const response = await fetch(url, options);
            const data = await response.json();
            

            const userDetails = data.user_data[0];

            localStorage.setItem('userDetails', JSON.stringify(userDetails));


            navigate('/');
        }
        catch(err) {
            setBackendErr({showErr: true, errMsg: err.message})
            
            setTimeout(() => {
                setBackendErr({showErr: false, errMsg: ""})
            }, 3000)
        }

    }

    const handlOnClickPasswordIcon = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div className="login-page__bg-container">
            <div className="login-page__left-section">
                <img alt='signup img' src="https://images.pexels.com/photos/355288/pexels-photo-355288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
            </div>
            <div className="login-page__right-section">
                <form onSubmit={handleOnSubmit} className="login-page__form-container">
                    <h1>Sign In</h1>
                    <p>Doesn't have an account? <Link to="/login" className='login-page__link-items'>Sign up</Link></p>

                    <label htmlFor='email'>Email address *</label>
                    <input type='email' name='email' value={form.email} onChange={handleOnChangeInput} />

                    <div className='login-page__password-wrapper'>
                        <label htmlFor='password'>Password *</label>
                        <input type={showPassword ? 'text' : 'password'} name='password' value={form.password} onChange={handleOnChangeInput} />
                        <button type='button' onClick={handlOnClickPasswordIcon}>
                            {showPassword ? <IoEyeOffSharp className='login-page__password-icons' /> : <IoEye className='login-page__password-icons' /> }
                        </button>
                    </div>

                    {backendErr.showErr && <p className='login-page__err-msg'>{backendErr.errMsg}</p>}

                    <button disabled={disableSubmitBtn} className={disableSubmitBtn ? 'login-page__submit-btn-disabled' : 'login-page__submit-btn'} type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}


export default Login;
import React, { useState } from "react";
import './App.css';
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import signupBackground from "./Assets/signup page background.jpg"
import signupDisplayPicture from "./Assets/3960020_2090141.jpg"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

export function SignUp() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('')
    const [messageTogggle, setMessageToggle] = useState(false)
    const [messageStyle, setMessageStyle] = useState('SignUpErrorMessage')
    const [Email, setEmail] = useState('');
    const [UserName, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()

    function SendToReduxStore() {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(Email)){
            setMessage("Please enter a valid Email")
            setMessageToggle(true)
            setMessageStyle('SignUpErrorMessage')
        }
        else if(UserName===''){
            setMessage('User Name cannot be empty')
            setMessageToggle(true)
            setMessageStyle('SignUpErrorMessage')
        }
        else if(Password.length<=8){
            setMessage('Password must be 8 characters long')
            setMessageToggle(true)
            setMessageStyle('SignUpErrorMessage')
        }
        else if(Password!==ConfirmPassword){
            setMessage('Pass and Confirm Pass is not same')
            setMessageToggle(true)
            setMessageStyle('SignUpErrorMessage')
        }
        else{
            setMessage('Sign up Success!!!')
            setMessageToggle(true)
            setMessageStyle('SignUpSuccessMessage')
            dispatch(
                {
                    type: 'SET_SIGNUP',
                    Email: Email,
                    UserName: UserName,
                    Password: Password,
                    ConfirmPassword: ConfirmPassword
                }
            )
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        }
    }
    const userData = useSelector((data)=>data)

    return(
        <>
        <div className="login-Page-Container">
            <div className="login-Image-Container">
                <img className="login-Background-Image"  src={signupBackground}/>
            </div>

            <div className="login-Details-Container">
                <div className="login-Shadow_box">
                    <div className="login-Details-Image-container">
                        <img className="login-Details-Image" src={signupDisplayPicture}/>
                    </div>

                    <div className="login-Details-Inner-Container">
                        <div className="header-container">
                            <div className="heading">
                                <span className="name">Forms</span>
                                <span className="slogan">View, Edit or Create a new form</span>
                            </div>
                            <div className="SignUp-toggle">Already have an account? <Link style={{color:"#FF2E2E", fontWeight:"bold"}} to="/">Sign in</Link></div>
                        </div>
                        <div className="signup-entry-fields">
                            <div>
                                <label className="input-label" htmlFor="UserName">Email</label>
                                <Input value={Email} className="input-field" placeholder="Enter Your Email" onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
                            </div>
                            <div>
                                <label className="input-label" htmlFor="UserName">User name</label>
                                <Input value={UserName} className="input-field" placeholder="Enter Your User name" onChange={(e)=>{setUsername(e.currentTarget.value)}}/>
                            </div>
                            <div>
                                <label className="input-label" htmlFor="PassWord">Password</label>
                                <Input.Password value={Password} className="input-field" placeholder="Enter Your Password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                onChange={(e)=>{setPassword(e.currentTarget.value)}}
                                />
                            </div>
                            <div>
                                <label className="input-label" htmlFor="PassWord">Confirm Password</label>
                                <Input value={ConfirmPassword} className="input-field" placeholder="Enter Your Password" onChange={(e)=>{setConfirmPassword(e.currentTarget.value)}}/>
                            </div>
                            <Button className="loginBtn" onClick={()=>{SendToReduxStore()}}>Sign Up</Button>
                        </div>

                    </div>
                    {messageTogggle && <div className={messageStyle}>{message}</div>}
                    
                </div>
            </div>
        </div>
        </>
    )
}
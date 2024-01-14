//LoginPage.jsx
import React, { useState } from "react";
import './App.css';
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import loginBackground from "./Assets/login page background.jpg"
import loginDisplayPicture from "./Assets/4105860_2152177.jpg"
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

export function LoginPage() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [messageTogggle, setMessageToggle] = useState(false)
    const [UserName, setUserName] = useState('');
    const [UserPassWord, setUserPassWord] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    function toDashBoard() {
        let StoredUserName = userData.signUpData[0].UserName;
        let StoredUserPassword = userData.signUpData[0].Password
        if(UserName===StoredUserName && UserPassWord===StoredUserPassword && UserName!=='' && UserPassWord!==''){
            navigate("/dashboard");
            dispatch(
                {
                    type: "NOTIFICATION_TOGGLE",
                    data: true
                }
            )
        }
        else{
            setMessageToggle(true)
        }
    }
    const userData = useSelector((data)=>data)
    return (
        <>
        <div className="login-Page-Container">
            <div className="login-Image-Container">
                <img className="login-Background-Image" src={loginBackground} />
            </div>

            <div className="login-Details-Container">
                <div className="login-Shadow_box">
                    <div className="login-Details-Inner-Container">
                        <div className="header-container">
                            <div className="heading">
                                <span className="name">Forms</span>
                                <span className="slogan">View, Edit or Create a new form</span>
                            </div>
                            <div className="SignUp-toggle">Don't have an account? <Link style={{color:"#FF2E2E", fontWeight:"bold"}} to="/signup">Sign up</Link></div>
                        </div>
                        <div className="entry-fields">
                            <div>
                                <label className="input-label" htmlFor="UserName">User name</label>
                                <Input className={messageTogggle ? "error-indicator" : "input-field"} placeholder="Enter Your User name" onChange={(e)=>{setUserName(e.currentTarget.value)}}/>
                            </div>
                            <div>
                                <label className="input-label" htmlFor="PassWord">Password</label>
                                <Input.Password className={messageTogggle ? "error-indicator" : "input-field"}  placeholder="Enter Your Password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                onChange={(e)=>{setUserPassWord(e.currentTarget.value)}}
                                />
                            </div>
                            <Button className="loginBtn" onClick={()=>{toDashBoard()}}>Sign In</Button>
                        </div>

                    </div>
                    <div className="login-Details-Image-container">
                        <img className="login-Details-Image" src={loginDisplayPicture}/>
                    </div>
                    {messageTogggle && <div className="LoginErrorMessage">User name or Password is invalid, <br /> try Changing it or Sign up </div>}
                </div>
            </div>
        </div>
        </>
    )
}
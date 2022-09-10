import { Logo } from '../.././components/login/logo';
import { LoginContainer } from '../.././components/login/login';
import { Circles } from '../.././components/login/circles';

import React from "react"


const Login = (props) => {
    return (
        <div>
            <Logo />
            <LoginContainer/>
            <Circles />
        </div>
    )
};

export default Login;
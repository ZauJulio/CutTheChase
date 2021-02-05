import React from 'react';
import UserLogin from "./Login/User";
import AdminLogin from "./Login/Admin"

function Login () {
    return (
    <div>
        <UserLogin></UserLogin>
        <AdminLogin></AdminLogin>
    </div>);
}

export default Login;
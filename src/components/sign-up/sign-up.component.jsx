import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        
        if (password !== confirmPassword){
            alert("password don't match!");
            return ;
        };

        signUpStart({email, password, displayName});
    };

    const handleChange = event => {
        const {value, name} = event.target;

        setCredentials({ ...userCredentials, [name]: value});
    }

    return(
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput 
                    name="displayName" 
                    value={displayName} 
                    type="text"
                    handleChange={handleChange}
                    label="Display Name" 
                    required
                />
                <FormInput 
                    name="email" 
                    value={email} 
                    type="email"
                    handleChange={handleChange}
                    label="Email" 
                    required
                />
                <FormInput 
                    name="password" 
                    value={password} 
                    type="password"
                    handleChange={handleChange}
                    label="Password" 
                    required
                />
                <FormInput 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    type="password"
                    handleChange={handleChange}
                    label="Confirm Password" 
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
    
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);
import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword){
            alert("password don't match!");
            return ;
        }

        signUpStart({email, password, displayName});

        
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value});
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="displayName" 
                        value={displayName} 
                        type="text"
                        handleChange={this.handleChange}
                        label="Display Name" 
                        required
                    />
                    <FormInput 
                        name="email" 
                        value={email} 
                        type="email"
                        handleChange={this.handleChange}
                        label="Email" 
                        required
                    />
                    <FormInput 
                        name="password" 
                        value={password} 
                        type="password"
                        handleChange={this.handleChange}
                        label="Password" 
                        required
                    />
                    <FormInput 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        type="password"
                        handleChange={this.handleChange}
                        label="Confirm Password" 
                        required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);
import React from 'react';
import validator from 'validator';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { login, clearLoginError } from '../../actions/account';
import DialogWindow from '../DialogWindow';

class Login extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, meta, type, label }) => {
        const className = `ui input field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <>
                {label && <div><b>{label}</b></div>}
                <div className={className}>
                    <input {...input} autoComplete='off' className="prompt" type={type} />
                    {this.renderError(meta)}
                </div>
            </>
        );
    }

    renderCheckbox = ({ input, meta, type, label }) => {
        const className = `ui checkbox${meta.error && meta.touched ? ' error' : ''}`;
        return (
            <>
                <div className={className}>
                    <input {...input} type={type} />
                    <label>{label}</label>
                    {this.renderError(meta)}
                </div>
            </>
        );
    }

    onSubmit = (formValues) => {
        this.props.login(formValues);
    }

    render() {
        //todo style this better, really center it on the screen 
        return (
            <>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui search" style={{ textAlign: 'center', marginTop: '20vh' }}>
                    <div className="ui input" style={{ display: 'inline' }}>
                        <br />
                        <Field
                            name='email'
                            component={this.renderInput}
                            label='Email'
                        />
                        <br />
                        <br />
                        <br />
                        <Field
                            name='password'
                            component={this.renderInput}
                            label='Password'
                            type='password'
                        />
                        <br />
                        <br />
                        <Field
                            name='rememberMe'
                            component={this.renderCheckbox}
                            label='Remember me'
                            type='checkbox'
                        />
                        <br />
                        <br />
                        <button className="circular ui icon button" style={{ width: '183px' }}>Login</button>
                    </div>
                </form>
                {this.props.loginErrorOccured &&
                    <DialogWindow
                        proceedAction={this.props.clearLoginError}
                        text={'Wrong email or password!'}
                        primaryButtonText={'Try again'}
                    />}
            </>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (formValues.email !== undefined && !validator.isEmail(formValues.email)) {
        errors.email = 'You must enter a valid email';
    }
    if (!formValues.password) {
        errors.password = 'You must enter your password';
    }

    return errors;
}

const mapStateToProps = state => {
    return { loginErrorOccured: state.userInfo.loginErrorOccured };
}

export default connect(mapStateToProps, { login, clearLoginError })(
    reduxForm({ form: 'login', validate })(Login)
);
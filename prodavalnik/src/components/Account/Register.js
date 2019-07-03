import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validator from 'validator';

import { createAccount, clearRegisterError } from '../../actions/account';
import ReCaptchaComponent from '../ReCaptcha';
import history from '../../reducers/history'
import DialogWindow from '../DialogWindow';

class Register extends React.Component {
    // todo: make the error boxes pretty 
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            );
        }
    }

    onSubmit = (formValues) => {
        formValues.reCaptchaToken = !this.state ? '' : this.state.reCaptchaToken;//todo rewrite this without state, maybe use <field> around ReCaptchaComponent
        this.props.createAccount(formValues);
    }

    renderInput = ({ input, meta, type, labelText, labelBefore }) => {
        const className = `ui input field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <>
                {labelBefore && <div><b>{labelBefore}</b></div>}
                <div className={className}>
                    <input {...input} autoComplete='off' className="prompt" type={type} />
                    {labelText && <label>{labelText}</label>}
                    {this.renderError(meta)}
                </div>
            </>
        );
    }

    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui search" style={{ textAlign: 'center', marginTop: '10vh' }}>
                    <div className="ui input" style={{ display: 'inline' }}>
                        <br />
                        <Field
                            name='username'
                            component={this.renderInput}
                            labelBefore='Username'
                        />
                        <br />
                        <br />
                        <Field
                            name='email'
                            component={this.renderInput}
                            labelBefore='Email'
                        />
                        <br />
                        <br />
                        <Field
                            name='password'
                            component={this.renderInput}
                            type="password"
                            labelBefore='Password'
                        />
                        <br />
                        <br />
                        <Field
                            name='reEnterPassword'
                            component={this.renderInput}
                            type="password"
                            labelBefore='Re-enter password'
                        />
                        <br />
                        <br />
                        <Field
                            name='termsAndConditions'
                            component={this.renderInput}
                            type='checkbox'
                            labelText='I agree with the terms and conditions'
                        />
                        <br />
                        <br />
                        <ReCaptchaComponent raiseToken={(reCaptchaToken) => this.setState({ reCaptchaToken })} />
                        <button className="circular ui icon button" style={{ width: '183px' }}>Register</button>
                    </div>
                </form>
                {this.props.isRegistrationSuccessful &&
                    <DialogWindow
                        proceedAction={history.goBack}
                        text={'Your registration was successful!'}
                        primaryButtonText={'Proceed'}
                    />}
                {this.props.registerErrorOccured &&
                    <DialogWindow
                        proceedAction={this.props.clearRegisterError}
                        text={this.props.registerErrorMessage}
                        primaryButtonText={'Try again'}
                    />}
            </>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
        errors.username = 'You must enter username';
    }

    if (formValues.email === undefined) {
        errors.email = 'You must enter a valid email';
    }
    else if (!validator.isEmail(formValues.email)) {

        errors.email = 'You must enter a valid email';
    }

    if (!formValues.password) {
        errors.password = 'You must enter your password';
    }
    else if (formValues.password.length < 6) {
        errors.password = 'Password must be more than five characters';
    }

    if (formValues.reEnterPassword !== formValues.password) {
        errors.reEnterPassword = 'Passwords do not match';
    }

    if (!formValues.reEnterPassword) {
        errors.reEnterPassword = 'You must repeat your password';
    }

    if (!formValues.termsAndConditions) {
        errors.termsAndConditions = 'You must accept the terms and conditions';
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        isRegistrationSuccessful: state.userInfo.isRegistrationSuccessful,
        registerErrorOccured: state.userInfo.registerErrorOccured,
        registerErrorMessage: state.userInfo.registerErrorMessage
    };
}

export default connect(mapStateToProps, { createAccount, clearRegisterError })(
    reduxForm({ form: 'register', validate })(
        Register)
);
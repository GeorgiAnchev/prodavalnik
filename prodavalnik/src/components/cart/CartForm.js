import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class CartForm extends React.Component {
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
        this.props.reset();
        console.log('order submited');
    }

    renderInput = ({ input, meta, type, labelBefore }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <>
                {labelBefore && <div><b>{labelBefore}</b></div>}
                <div className={className}>
                    <input {...input} autoComplete='off' />
                    {this.renderError(meta)}
                </div>
            </>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <br />
                <Field
                    name='adress1'
                    component={this.renderInput}
                    labelBefore='Adress line 1'
                />
                <Field
                    name='adress2'
                    component={this.renderInput}
                    labelBefore='Adress line 2'
                />
                <Field
                    name='country'
                    component={this.renderInput}
                    labelBefore='Country'
                />
                <Field
                    name='city'
                    component={this.renderInput}
                    labelBefore='City'
                />
                <Field
                    name='postalCode'
                    component={this.renderInput}
                    labelBefore='Postal Code'
                />
                <button className="ui button primary" >Order</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.adress1) {
        errors.adress1 = 'You must enter an adress';
    }

    if (!formValues.country) {
        errors.country = 'You must enter a country';
    }

    if (!formValues.city) {
        errors.city = 'You must enter a city';
    }

    if (!formValues.postalCode) {
        errors.postalCode = 'You must enter a postalCode';
    }

    return errors;
}

export default reduxForm(
    { form: 'createOrder', validate }
)(
    connect(null, {})(CartForm)
);
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createProductReview } from '../../actions';
import { connect } from 'react-redux';

class CreateReview extends React.Component {
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
        this.props.createProductReview(formValues, this.props.token, this.props.sku);
    }

    renderInput = ({ input, meta, type, label }) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}: </label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                {/* <Field
                    name='title'
                    component={this.renderInput}
                    label='Title'
                /> */}
                <Field
                    name='content'
                    component={this.renderInput}
                    label='Content'
                />
                {/*todo: make this a slider or number not text field */}
                <Field
                    name='rating'
                    component={this.renderInput}
                    label='Rating'
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    // if (!formValues.title) {
    //     errors.title = 'You must enter a title';
    // }

    if (!formValues.body) {
        errors.body = 'You must enter content';
    }

    if (!formValues.rating) {
        errors.rating = 'You must enter rating';
    }

    return errors;
}

const mapsStateToProps = (state) => {
    return {
        token: state.userInfo.token,
        sku: state.productDetails.sku
    }
}

export default reduxForm(
    { form: 'createReview', validate }
)(
    connect(mapsStateToProps, { createProductReview })(CreateReview)
);
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../actions/product';
import history from '../reducers/history';

class SearchBox extends React.Component {
    onSubmit = (formValues) => {
        history.push(`/searchResults/${formValues.searchTerm}/1`);//todo maybe rewrite this to use query params istead of routes
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui icon input" style={{ display: 'inline-block' }}>
                <Field
                    name='searchTerm'
                    component={this.renderInput}
                />
            </form>
        );
    }

    renderInput = ({ input }) => {
        return (
            <>
                <input {...input} className="prompt" type="text" placeholder="Search products..." />
                <i className="search icon" />
            </>
        );
    }
}

export default reduxForm({ form: 'searchProducts' })(
    connect(null, { fetchSearchResults })(SearchBox)
);
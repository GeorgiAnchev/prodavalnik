import React from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions';

class Sidebar extends React.Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        return renderCategories(this.props.categories);
    };
};

const renderCategories = (categories) => {
    return categories.map(category => {
        return (
            <a className="item" href="./" key={category.id}> {/* todo refactor this href, maybe use router */}
                {category.name}
            </a>
        );
    });
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

export default connect(mapStateToProps, { fetchCategories })(Sidebar);
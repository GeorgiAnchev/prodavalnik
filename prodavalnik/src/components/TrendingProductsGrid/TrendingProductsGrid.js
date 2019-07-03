import React from 'react';
import { connect } from 'react-redux';

import { fetchTrendingProducts } from '../../actions/product'
import TrendingProductThumbnail from './TrendingProductThumbnail';

class TrendingProductsGrid extends React.Component {
    componentDidMount() {
        this.props.fetchTrendingProducts();
    }

    render() {
        return (
            <div className="ui grid">
                {renderList(this.props.products)}
            </div>
        );
    };
};

const renderList = products => {
    return products.map(product => {
        return <TrendingProductThumbnail product={product} key={product.sku} />
    });
};

const mapStateToProps = (state) => {
    return {
        products: state.topTrendingProducts
    };
};

export default connect(mapStateToProps, { fetchTrendingProducts })(TrendingProductsGrid);
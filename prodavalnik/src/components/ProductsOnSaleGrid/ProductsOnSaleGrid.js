import React from 'react';
import { connect } from 'react-redux';

import { fetchTopDailyDeals } from '../../actions/product';
import ProductOnSaleThumbnail from './ProductOnSaleThumbnail';

class ProductsOnSaleGrid extends React.Component {
    componentDidMount() {
        this.props.fetchTopDailyDeals();
    }

    render() {
        return (
            <div className="ui grid" >
                {renderList(this.props.products)}
            </div>
        );
    };
};

const renderList = products => {
    return products.map(product => {
        return <ProductOnSaleThumbnail product={product} key={product.sku} />
    });
};

const mapStateToProps = (state) => {
    return {
        products: state.topDailyDeals
    };
};

export default connect(mapStateToProps, { fetchTopDailyDeals })(ProductsOnSaleGrid);
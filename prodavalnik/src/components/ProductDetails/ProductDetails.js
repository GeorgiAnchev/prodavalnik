import React from 'react';
import { connect } from 'react-redux';

import CategoryBreadcrumb from './CategoryBreadcrumb';
import ReviewsList from '../Reviews/ReviewsList';
import './ProductDetails.css';
import { fetchProductDetails } from '../../actions/product';
import AddToCartButton from '../cart/AddToCartButton';
import RemoveFromCartButton from '../cart/RemoveFromCartButton';

class ProductDetails extends React.Component {
    componentDidMount() {
        this.props.fetchProductDetails(this.props.match.params.id);
    }

    renderCartButton() {
        const id = this.props.match.params.id;
        if (this.props.cart.ids.includes(id)) {
            return <RemoveFromCartButton id={id} />
        }
        else {
            return <AddToCartButton id={id} />
        }
    }

    render() {
        const product = this.props.product;

        return (
            <div style={lightPadding}>
                <img alt="immage unnavailable" src={product.image} width="200" />
                {this.renderCartButton()}

                <div>
                    Name: <div className="ui label">{product.name}</div>
                </div>
                <div>
                    Price: <div className="ui label">{product.regularPrice}</div>
                </div>
                <div>
                    Category: <CategoryBreadcrumb categoryPath={product.categoryPath} />
                </div>
                <div>
                    Description: <div className="ui label">{product.shortDescription}</div>
                </div>
                <div>
                    Manufacturer: <div className="ui label">{product.manufacturer}</div>
                </div>
                <div>
                    Shipping info: {getShippingInfo(product.shipping)} {/* todo refactor this shit */}
                </div>
                <div>
                    Availability: {getAvailability(product.inStoreAvailability)}
                </div>
                <div>
                    Customer rating: <div className="ui label">{product.customerReviewAverage}</div>
                </div>
                {getReviews(product.sku)}
            </div>
        );
    };
};

const lightPadding = {
    padding: '5px'
}

const greenColor = {
    backgroundColor: 'lightgreen'
};

const redColor = {
    backgroundColor: 'red'
};

const getReviews = (sku) => {
    if (sku === undefined) return null;
    return <ReviewsList sku={sku} />
}

const getAvailability = (availability) => {
    if (availability === true) {
        return <div className="ui label" style={greenColor}>Yes</div>
    }
    return <div className="ui label" style={redColor}>No</div>
}

//todo: refactor into something that makes sense 
const getShippingInfo = (shipping) => {
    if (shipping === undefined || shipping[0] === undefined) return null;
    return <div className="ui label">{shipping[0].ground}</div>
}

const mapStateToProps = (state) => {
    return {
        product: state.productDetails,
        cart: state.cart
    }
}

export default connect(mapStateToProps, { fetchProductDetails })(ProductDetails);
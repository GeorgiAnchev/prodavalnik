import React from 'react';
import { connect } from 'react-redux';

import CartForm from './CartForm';
import { fetchListOfProducts } from '../../actions/product';

class Cart extends React.Component {
    componentDidMount() {
        if (this.props.cartIds.length > 0) {
            this.props.fetchListOfProducts(this.props.cartIds);
        }
    }

    render() {
        return (
            <div >
                {this.getItems()}
                {this.props.products.length > 0 &&
                    <div className="ui segment comments">
                        <CartForm />
                    </div>
                }
                {this.props.products.length === 0 &&
                    <div className="ui segment ">
                        Your cart is empty.
                    </div>
                }
            </div>

        );
    }

    getItems = () => {
        // if (this.props.products !== undefined) {
        return this.props.products.map(
            product => {
                return (
                    <div key={product.sku} className="ui segment comments">
                        <img alt='immage unnavailable' src={product.image} width='150' height='150' style={{ display: 'inline' }} />
                        <div style={{ display: 'inline' }} >
                            <div className="ui label">{product.name}</div>
                        </div >
                        <div style={{ display: 'inline' }}>
                            <div className="ui label yellow">${product.salePrice}</div>
                        </div>
                    </div>
                );
            }
        )
        // }
        // return null;
    }
}

const mapStateToProps = (state) => {
    return {
        cartIds: state.cart.ids,
        products: state.cart.productList
    };
}

export default connect(mapStateToProps, { fetchListOfProducts })(Cart); 
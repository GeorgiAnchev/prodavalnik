import React from 'react';
import { addToCart } from '../../actions';
import { connect } from 'react-redux';

class AddToCartButton extends React.Component {
    render() {
        return <div
            onClick={this.addToCart}
            className="ui button"
        >Add to cart</div>
    }

    addToCart = () => {
        this.props.addToCart(this.props.id)
    }
}

export default connect(null, { addToCart })(AddToCartButton); 
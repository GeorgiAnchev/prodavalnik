import React from 'react';
import { removeFromCart } from '../../actions';
import { connect } from 'react-redux';

class AddToCartButton extends React.Component {
    render() {
        return <div
            onClick={this.addToCart}
            className="ui button"
        >Remove from cart</div>
    }

    addToCart = () => {
        this.props.removeFromCart(this.props.id)
    }
}

export default connect(null, { removeFromCart })(AddToCartButton); 
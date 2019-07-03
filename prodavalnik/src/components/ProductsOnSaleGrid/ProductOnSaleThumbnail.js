import React from 'react';
import { Link } from 'react-router-dom';

import './ProductOnSaleThumbnail.css';
//todo unite this class with trendingproductThumbnail
const ProductOnSaleThumbnail = ({ product }) => {
    return (
        <div className='four wide column'>
            <div className='ui segment hoverable'>
                <Link to={'/productDetails/' + product.sku} >
                    <img alt="unnavailable" src={product.image} height="200" width="150" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }} />
                    <div>
                        <del>
                            ${product.regularPrice}
                        </del>
                        <span style={newPriceStyle}> ${product.salePrice}  </span>
                        <div className="ui red tag label">DEAL OF THE DAY</div>
                    </div>
                    <div>
                        <h3>{product.name}</h3> {/* todo: make this wraped  */}
                    </div>
                    <div>
                        Save <span style={savingStyle}>{product.percentSavings}%</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

const savingStyle = {
    fontSize: '1.2em'
}

const newPriceStyle = {
    fontSize: '1.4em',
    marginLeft: '5px',
    marginRight: '5px'
}

export default ProductOnSaleThumbnail;
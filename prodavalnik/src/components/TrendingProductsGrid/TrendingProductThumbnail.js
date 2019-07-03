import React from 'react';
import { Link } from 'react-router-dom';

import './TrendingProductThumbnail.css';
//todo prettify this
const TrendingProductThumbnail = ({ product }) => {
    return (
        <div className='four wide column'>
            <div className='ui segment hoverable'>
                <Link to={'/productDetails/' + product.sku}>
                    <img alt="immage unnavailable" src={product.image} height="200" width="150" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }} />
                    <span style={newPriceStyle}> ${product.regularPrice}  </span>
                    <div className="ui yellow tag label">TRENDING</div>
                    <div>
                        <h3>{product.name}</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
};

const newPriceStyle = {
    fontSize: '1.4em',
    marginLeft: '5px',
    marginRight: '5px'
};

export default TrendingProductThumbnail;
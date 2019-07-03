import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import ProductDetails from './ProductDetails/ProductDetails';
import ProductsOnSaleGrid from './ProductsOnSaleGrid/ProductsOnSaleGrid';
import TrendingProductsGrid from './TrendingProductsGrid/TrendingProductsGrid';
import Register from './Account/Register';
import Login from './Account/Login';
import history from '../reducers/history';
import Cart from './cart/Cart';
import SearchResultsTable from './SearchResults/SearchResultsTable';
import { loadReCaptcha } from 'react-recaptcha-google';

class App extends React.Component {
  componentDidMount() {
    loadReCaptcha();
  }
  render() {
    return (
      <Router history={history}>
        <>
          <Route path="/" component={Header} />
          <div className="ui grid" style={containerStyle}>
            <div className="two wide column ui visible inverted left vertical menu">
              <Sidebar />
            </div>
            <div className="fourteen wide column" style={{ paddingTop: 0 }} >
              <Route path='/searchResults/:searchTerm/:page/:filter?' exact component={SearchResultsTable} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={ProductsOnSaleGrid} />
              <Route path="/" exact component={TrendingProductsGrid} />
              <Route path="/productDetails/:id" exact render={(props) => <ProductDetails {...props} product={this.props.product} />} />
              <Route path='/cart' exact component={Cart} />
            </div>
          </div>
        </>
      </Router >
    );
  };
};

const containerStyle = {
  marginTop: "5px"
}

export default App;
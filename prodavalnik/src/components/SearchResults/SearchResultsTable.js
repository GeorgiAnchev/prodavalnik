import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSearchResults } from '../../actions/product';

class SearchResultsTable extends React.Component {
    componentDidMount() {
        console.log(this.props.match.params.searchTerm, this.props.match.params.page, this.props.match.params.filter)
        this.props.fetchSearchResults(this.props.match.params.searchTerm, this.props.match.params.page, this.props.match.params.filter);
    }

    componentDidUpdate(oldProps) {
        if (this.props.match.params.page !== oldProps.match.params.page
            || this.props.match.params.searchTerm !== oldProps.match.params.searchTerm
            || this.props.match.params.filter !== oldProps.match.params.filter
        ) {
            this.props.fetchSearchResults(this.props.match.params.searchTerm, this.props.match.params.page, this.props.match.params.filter);
        }
    }

    render() {
        const route = `/searchResults/${this.props.match.params.searchTerm}`;
        return (
            <div className='ui grid'>
                <div className='thirteen wide column '>
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Condition</th>
                                <th>Availaible</th>
                                <th>Customer rating</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                        <tfoot>
                            <tr><th colSpan="5">
                                <div className="ui right floated pagination menu">
                                    <div className="icon item"><i className="left chevron icon" /></div> {/* todo implement the arrows and dinamicaly generating of the pages */}
                                    <Link to={route + '/1'} className="item" >1</Link>
                                    <Link to={route + '/2'} className="item" >2</Link>
                                    <Link to={route + '/3'} className="item" >3</Link>
                                    <Link to={route + '/4'} className="item" >4</Link>
                                    <Link to={route + '/5'} className="item" >5</Link>
                                    <Link to={route + '/6'} className="item" >6</Link>
                                    <div className="icon item"><i className="right chevron icon" /></div>
                                </div>
                            </th>
                            </tr></tfoot>
                    </table>
                </div>
                <div className="three wide column ui visible inverted right vertical menu">
                    <div className="item">Condition: </div>
                    {this.renderFaucets()}
                </div>
            </div >
        );
    };

    renderList = () => {
        if (this.props.products === undefined) return null;
        return this.props.products.map(product => {
            //todo make avery row a link to an actual product and give it hover effect 
            return (
                <tr key={product.sku}>
                    <td style={{ width: '15vw' }}><img alt="immage unnavailable" src={product.image} width="200" /></td>
                    <td style={{ width: '15vw', wordWrap: 'break-word' }}>{product.name}</td>
                    <td>{product.condition}</td>
                    <td>{product.onlineAvailability ? 'Yes' : 'No'}</td>
                    <td>{product.customerReviewAverage !== null ? product.customerReviewAverage : 'Unavailable'}</td>
                    <td>${product.regularPrice}</td>
                </tr>
            );
        });
    };

    renderFaucets = () => {
        if (this.props.facets === undefined) return null;

        const condition = this.props.facets.condition;

        return Object.keys(condition).map(key => {
            return (
                // todo this does not work very well, after filter the facets get fewer
                <Link className="item" to={`/searchResults/${this.props.match.params.searchTerm}/1/condition=${key}`} key={key}> {/* todo refactor this href, maybe use router */}
                    {key} ({condition[key]})
                </Link>
            );
        });
    };
};

const mapStateToProps = (state) => {
    return {
        products: state.searchResults,
        facets: state.searchResults.facets // todo implement facets with mongo
    };
};

export default connect(mapStateToProps, { fetchSearchResults })(SearchResultsTable);
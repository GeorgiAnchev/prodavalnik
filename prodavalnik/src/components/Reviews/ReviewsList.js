import React from 'react';
import { connect } from 'react-redux';

import { fetchProductReviews } from '../../actions';
import Review from './Review';
import CreateReview from './CreateReview';

class ReviewsList extends React.Component {
    componentDidMount() {
        this.props.fetchProductReviews(this.props.sku);
    }

    render() {
        return (
            <div className="ui segment comments">
                <h3 className="ui dividing header">Reviews</h3>
                {this.props.reviews.map(
                    review => { return <Review review={review} key={review._id} /> }
                )}
                <h3 className="ui dividing header">Submit review:</h3>

                {this.props.userInfo.isSignedIn && !this.props.reviewAlreadySubmitted && <CreateReview />}
                {!this.props.userInfo.isSignedIn && <div>Log in to submit a review</div>}
                {this.props.reviewAlreadySubmitted && <div>You have already submitted a review for this product</div>}
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    debugger
    const reviews = state.productReviews;
    const userInfo = state.userInfo;
    const reviewAlreadySubmitted =
        userInfo.account
            ? reviews.some(review => review.owner === userInfo.account._id)
            : false;

    return {
        reviews,
        userInfo,
        reviewAlreadySubmitted
    }
}


export default connect(mapsStateToProps, { fetchProductReviews })(ReviewsList);
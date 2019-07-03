import React from 'react';

export default ({ review }) => {

    const getDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    return (
        <>
            <div className="comment" >
                <div className="avatar" style={{ paddingTop: '15px' }}>
                    {review.rating}%
            </div>
                <div className="content">
                    <span className="author">{review.ownerUsername}</span>
                    <div className="metadata">
                        <span className="date">{getDate(review.createdAt)}</span>
                    </div>
                    <div className="text">
                        {review.content}
                    </div>
                </div>
            </div>
            <br />
        </>
    );
}

import React from 'react';

const Breadcrumb = (props) => {
    const getElements = (arr) => {
        if (arr === undefined) {
            return null;
        }

        const rows = [];
        //todo refactor this with join 
        for (var i = 0; i < arr.length; i++) {
            rows.push(
                <div className="ui label" key={`${arr[i].name} label`}>
                    {arr[i].name}
                </div>
            );
            if (i < arr.length - 1) {
                rows.push(
                    <i className="right chevron icon divider" key={`${arr[i].name} divider`}></i>
                );
            }
        }

        return (
            <div className="ui small breadcrumb">
                {rows}
            </div>
        );
    };

    return getElements(props.categoryPath);
};

export default Breadcrumb;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './Account/Logout';
import SearchBox from './SearchBox';

class Header extends React.Component {

    render() {
        return (
            <div className="ui category search" style={{ textAlign: 'center' }}>
                <Link to='/' className="ui button" style={{ float: 'left' }} >
                    Home
                </Link>
                <Link to='/cart' className="ui button" style={{ float: 'left' }} >  {/* todo style this to have a cool icon instead of text  */}
                    Cart
                </Link>
                <SearchBox />
                {this.renderAccountButtons()}
            </div>
        );
    }

    renderAccountButtons() {
        const path = this.props.location.pathname.toLowerCase();
        if (!path.includes("/register") && !path.includes("/login")) {

            if (!this.props.userInfo.isSignedIn) {
                return (
                    <div className="ui buttons" style={{ float: 'right', marginRight: '5px' }} >
                        <Link to="/register" className="ui button" >Register</Link>
                        <div className="or"></div>
                        <Link to="/login" className="ui button">Log in</Link>
                    </div>
                );
            }
            else {
                return (
                    <div className="ui buttons" style={{ float: 'right', marginRight: '5px' }} >
                        <Logout />
                    </div>
                );
            }
        }
    }
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(Header);
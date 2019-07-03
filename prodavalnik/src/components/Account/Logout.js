import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/account';

class Logout extends React.Component {
    render() {
        return <div onClick={this.signOut} className="ui button" >Log out</div>
    }
    signOut = () => {
        this.props.logout(this.props.token);
    }
}

const mapStateToProps = state => {
    return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps, { logout })(Logout);
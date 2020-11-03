import React, { Component } from 'react';
import { userActions } from '../actions/users.actions';
import { connect } from 'react-redux';

const User = props => (
    <tr>
        <td>{props.userInfo.username}</td>
        <td>{props.userInfo.firstName}</td>
        <td>{props.userInfo.lastName}</td>
    </tr>
)

class Home extends Component {

    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this);
        this.handleDisplayAllUser = this.handleDisplayAllUser.bind(this);

    }

    handleLogout(e) {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    handleDisplayAllUser(e) {
        const { dispatch } = this.props;
        dispatch(userActions.getAll());
    }

    userList() {
        return this.props.items.map(function (user, i) {
            return <User userInfo={user} key={i} />;
        })
    }

    render() {
        return (
            <div className="container">
                <h3> Welcome, {this.props.match.params.username} </h3>
                <button className="btn btn-primary" onClick={this.handleLogout}> Logout </button> &nbsp;
                <button className="btn btn-primary" onClick={this.handleDisplayAllUser}> Display All Users </button>

                {
                    this.props.items &&
                    <div style={{ marginTop: 20}}>
                        <h3>User List</h3>
                        <table className="table table-striped" style={{ marginTop: 20, padding: 10, textAlign:"center" }} >
                            <thead>
                                <tr>
                                    <th>UserName</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.userList()}
                            </tbody>
                        </table>
                    </div>
                    
                }

            </div>
        )
    }

}

function mapStateToProps(state) {
    const { items } = state.users;
    return {
        items: items
    };
}

const connectedLogoutPage = connect(mapStateToProps)(Home);
export { connectedLogoutPage as Home }; 
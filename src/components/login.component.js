import React, { Component } from 'react';
import { userActions } from '../actions/users.actions'
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserNameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="container">
                <div className="alert alert-info">
                    Valid credentials: <b> (test1, test1) </b> | <b> (test2, test2) </b> | <b> (test3, test3) </b>
                </div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleUserNameChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handlePasswordChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
                {
                    this.props.error && 
                    <h1> { this.props.error.response.data.message } </h1>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { loggedIn } = state.authentication;
    const { user } = state.authentication;
    const { error } = state.authentication;

    return {
        loggingIn: loggingIn,
        loggedIn: loggedIn,
        user: user,
        error: error
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }; 
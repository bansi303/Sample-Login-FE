import { userConstants } from '../constants/user.constants';
import axios from 'axios';
import { history } from '../helper/history'

export const userActions = {
    login,
    logout,
    getAll
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        axios.post('http://localhost:4000/users/authenticate',{'username': username, 'password': password})
            .then(
                user => {
                    dispatch(success(user.data));
                    axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + user.data.token;
                    history.push('/home/' + user.data.username);
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    history.push('/');
    delete axios.defaults.headers.common['Authorization'];
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        axios.get('http://localhost:4000/users/')
            .then(
                user => {
                    dispatch(success(user.data));
                },
                error => {
                    dispatch(failure(error));
                    this.logout();
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
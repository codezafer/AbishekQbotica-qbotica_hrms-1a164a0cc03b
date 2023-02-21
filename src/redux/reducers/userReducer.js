import { createSelector } from 'reselect';
import { prop, equals } from 'ramda';
import loginApi from '../../api/postLogin';
// import logoutApi from 'api/getLogout';
// import loginTypeApi from 'api/postUserType';
// import storage from 'redux-persist/lib/storage';
import { removeSession } from '../../utils/sessionutils';
// import { setLoginType } from './user';
import { LOGIN_ACTION as ACTIONS } from '../actions';

const initialState = {
    email: '',
    error: null,
    loading: false,
    user: {},
    result: '',
    role: '',
    roleName: '',
    uid: '',
    userName: '',
};

const getSlice = prop('user');

export const getEmail = createSelector(getSlice, prop('email'));

export const getError = createSelector(getSlice, prop('error'));

export const isLoading = createSelector(getSlice, prop('loading'));

export const getRole = createSelector(getSlice, prop('role'));

export const getRoleName = createSelector(getSlice, prop('roleName'));

export const getUserName = createSelector(getSlice, prop('userName'));

export const getUid = createSelector(getSlice, prop('uid'));


export const loginRedux = (userId, password, navigate) => async (dispatch) => {
    dispatch({
        type: ACTIONS.LOGIN_REQUEST,
    });
    try {
        const data = await loginApi(userId, password);
        dispatch({
            type: ACTIONS.LOGIN_SUCCESS,
            userData: data
        });
        if (equals('Login successful.', prop('Message', data))) {
            navigate('/dashboard');
        } else {
            dispatch({
                type: ACTIONS.LOGIN_FAILURE,
                error: data.Message,
            });
        }
    } catch (error) {
        dispatch({
            type: ACTIONS.LOGIN_FAILURE,
            error: error,
        });
    }
};

export default (state = initialState, { type, ...action } = {}) => {
    switch (type) {
        case ACTIONS.LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                user: action.userData,
                role: prop('Role', action.userData),
                roleName: prop('RoleName', action.userData),
                uid: prop('UserId', action.userData),
                userName: prop('UserName', action.userData),
                result: prop('Result', action.userData)
            }
        case ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return initialState;
    }
};

import { AUTH, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        
        // Correct usage of navigate
        if (navigate && typeof navigate.push === 'function') {
            navigate.push('/');
        }
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.message });
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        // Correct usage of navigate
        if (navigate && typeof navigate.push === 'function') {
            navigate.push('/');
        }
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.message });
    }
};

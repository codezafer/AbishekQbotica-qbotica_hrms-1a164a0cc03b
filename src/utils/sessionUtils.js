import { isNil, prop } from 'ramda';

export const storeSession = (sessionData) => sessionStorage.setItem('sessionId', prop('sessionid', sessionData));

export const getSession = () => sessionStorage.getItem('sessionId');

export const removeSession = () => sessionStorage.removeItem('sessionId');

export const hasSession = () => !isNil(sessionStorage.getItem('sessionId'));

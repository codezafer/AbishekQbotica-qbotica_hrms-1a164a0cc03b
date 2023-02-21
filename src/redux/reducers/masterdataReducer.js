import { createSelector } from 'reselect';
import { prop, equals } from 'ramda';
import getJobTitles from '../../api/getJobTitle';
import getJobTypes from '../../api/getJobType';
import getLocations from '../../api/getLocations';
import getUserRoles from '../../api/getUserRoles';
import getStates from '../../api/getState';
import getClients from '../../api/getClient';
import getSkills from '../../api/getSkills';

import { MASTER_DATA_ACTION as ACTIONS } from '../actions';

const initialState = {
    jobTitles: [],
    jobTypes: [],
    skills: [],
    clients: [],
    allLocations: [],
    states: [],
    roles: [],
    masterData: []
};

const getSlice = prop('masterData');

export const getJobTitles = createSelector(getSlice, prop('jobTitles'));

export const getJobTypes = createSelector(getSlice, prop('jobTypes'));

export const getSkills = createSelector(getSlice, prop('skills'));

export const getClients = createSelector(getSlice, prop('clients'));

export const getLocations = createSelector(getSlice, prop('allLocations'));

export const getStates = createSelector(getSlice, prop('states'));

export const getRoles = createSelector(getSlice, prop('roles'));


export const getMasterData = () => async (dispatch) => {
    dispatch({
        type: ACTIONS.MASTER_DATA_ACTION_REQUEST,
    });
    try {
        const jobtitles = await getJobTitles();
        const jobtypes = await getJobTypes();
        const locations = await getLocations();
        const states = await getStates();
        const roles = await getUserRoles();
        const clients = await getClients();
        const skills = await getSkills();

        let data = { jobtitles, jobtypes, locations, states, roles, clients, skills }
        console.log('masterData', data)
        dispatch({
            type: ACTIONS.MASTER_DATA_ACTION_SUCCESS,
            masterData: data
        });


    } catch (error) {
        dispatch({
            type: ACTIONS.MASTER_DATA_ACTION_FAILURE,
            error: error,
        });
    }
};

export default (state = initialState, { type, ...action } = {}) => {
    switch (type) {

        case ACTIONS.MASTER_DATA_ACTION_SUCCESS:
            return {
                ...state,
                masterData: action.masterData,
                jobTitles: action.masterData.jobtitles,
                jobTypes: action.masterData.jobtitles,
                skills: action.masterData.skills,
                clients: action.masterData.clients,
                allLocations: action.masterData.locations,
                states: action.masterData.states,
                roles: action.masterData.roles,
            }

        default:
            return initialState;
    }
};

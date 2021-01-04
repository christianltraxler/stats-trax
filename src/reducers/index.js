import {
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE,
    FETCH_TEAMS_STARTED
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    teams: {},
    error: null
  };
  
  export default function teamsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_TEAMS_STARTED:
        return {
          ...state,
          loading: true
        };
      case FETCH_TEAMS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          teams: action.payload
        };
      case FETCH_TEAMS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      default:
        return state;
    }
  }
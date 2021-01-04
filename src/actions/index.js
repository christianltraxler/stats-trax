import {
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE,
    FETCH_TEAMS_STARTED
  } from './types';
  import {getTeamsData} from '../functions'
  
  export function fetchTeams () {
    return function(dispatch) {
      dispatch(fetchTeamsStarted());
      return getTeamsData().then(res => {
          dispatch(fetchTeamsSuccess(res));

        })
        .catch(err => {
          dispatch(fetchTeamsFailure(err));
        });
    };
  };
  
  const fetchTeamsSuccess = teams => ({
    type: FETCH_TEAMS_SUCCESS,
    payload: {
      ...teams
    }
  });
  
  const fetchTeamsStarted = () => ({
    type: FETCH_TEAMS_STARTED
  });
  
  const fetchTeamsFailure = error => ({
    type: FETCH_TEAMS_FAILURE,
    payload: {
      error
    }
  });
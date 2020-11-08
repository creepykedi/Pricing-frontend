import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios'
import {
  HOME_GET_CONTRACTORS_LIST_BEGIN,
  HOME_GET_CONTRACTORS_LIST_SUCCESS,
  HOME_GET_CONTRACTORS_LIST_FAILURE,
  HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR,
} from './constants';

export function getContractorsList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_CONTRACTORS_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      
      const doRequest = axios.get('http://127.0.0.1:8000/contractors/')
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_GET_CONTRACTORS_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_GET_CONTRACTORS_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetContractorsListError() {
  return {
    type: HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR,
  };
}

export function useGetContractorsList(params) {
  const dispatch = useDispatch();

  const { getContractorsListPending, getContractorsListError } = useSelector(
    state => ({
      contractorsList: state.home.contractorsList,
      getContractorsListPending: state.home.getContractorsListPending,
      getContractorsListError: state.home.getContractorsListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getContractorsList(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetContractorsListError());
  }, [dispatch]);

  return {
    getContractorsList: boundAction,
    getContractorsListPending,
    getContractorsListError,
    dismissGetContractorsListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_CONTRACTORS_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getContractorsListPending: true,
        getContractorsListError: null,
      };

    case HOME_GET_CONTRACTORS_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        getContractorsListPending: false,
        getContractorsListError: null,
        contractorsList: action.data
      };

    case HOME_GET_CONTRACTORS_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getContractorsListPending: false,
        getContractorsListError: action.data.error,
      };

    case HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getContractorsListError: null,
      };

    default:
      return state;
  }
}

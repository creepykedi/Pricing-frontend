import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios'
import {
  HOME_GET_INQUIRIES_LIST_BEGIN,
  HOME_GET_INQUIRIES_LIST_SUCCESS,
  HOME_GET_INQUIRIES_LIST_FAILURE,
  HOME_GET_INQUIRIES_LIST_DISMISS_ERROR,
} from './constants';



export function getInquiriesList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_INQUIRIES_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://127.0.0.1:8000/inquiries/')
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_GET_INQUIRIES_LIST_SUCCESS,
            data: res.data
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_GET_INQUIRIES_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetInquiriesListError() {
  return {
    type: HOME_GET_INQUIRIES_LIST_DISMISS_ERROR,
  };
}

export function useGetInquiriesList(params) {
  const dispatch = useDispatch();

  const { getInquiriesListPending, getInquiriesListError } = useSelector(
    state => ({
      inquiriesList: state.home.inquiriesList,
      getInquiriesListPending: state.home.getInquiriesListPending,
      getInquiriesListError: state.home.getInquiriesListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getInquiriesList(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetInquiriesListError());
  }, [dispatch]);

  return {
    getInquiriesList: boundAction,
    getInquiriesListPending,
    getInquiriesListError,
    dismissGetInquiriesListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_INQUIRIES_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getInquiriesListPending: true,
        getInquiriesListError: null,
      };

    case HOME_GET_INQUIRIES_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        getInquiriesListPending: false,
        getInquiriesListError: null,
        inquiriesList: action.data
      };

    case HOME_GET_INQUIRIES_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getInquiriesListPending: false,
        getInquiriesListError: action.data.error,
      };

    case HOME_GET_INQUIRIES_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getInquiriesListError: null,
      };

    default:
      return state;
  }
}

import { useEffect, useCallback } from 'react';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_PAYMENT_DETAILS_BEGIN,
  HOME_GET_PAYMENT_DETAILS_SUCCESS,
  HOME_GET_PAYMENT_DETAILS_FAILURE,
  HOME_GET_PAYMENT_DETAILS_DISMISS_ERROR,
} from './constants';

export function getPaymentDetails(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_PAYMENT_DETAILS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://127.0.0.1:8000/inquiry/payments')
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_GET_PAYMENT_DETAILS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_GET_PAYMENT_DETAILS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetPaymentDetailsError() {
  return {
    type: HOME_GET_PAYMENT_DETAILS_DISMISS_ERROR,
  };
}

export function useGetPaymentDetails(params) {
  const dispatch = useDispatch();

  const { getPaymentDetailsPending, getPaymentDetailsError } = useSelector(
    state => ({
      payments: state.payments,
      getPaymentDetailsPending: state.home.getPaymentDetailsPending,
      getPaymentDetailsError: state.home.getPaymentDetailsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getPaymentDetails(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetPaymentDetailsError());
  }, [dispatch]);

  return {
    getPaymentDetails: boundAction,
    getPaymentDetailsPending,
    getPaymentDetailsError,
    dismissGetPaymentDetailsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_PAYMENT_DETAILS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getPaymentDetailsPending: true,
        getPaymentDetailsError: null,
      };

    case HOME_GET_PAYMENT_DETAILS_SUCCESS:
      // The request is success
      return {
        ...state,
        getPaymentDetailsPending: false,
        getPaymentDetailsError: null,
        payments: action.data.data
      };

    case HOME_GET_PAYMENT_DETAILS_FAILURE:
      // The request is failed
      return {
        ...state,
        getPaymentDetailsPending: false,
        getPaymentDetailsError: action.data.error,
      };

    case HOME_GET_PAYMENT_DETAILS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getPaymentDetailsError: null,
      };

    default:
      return state;
  }
}

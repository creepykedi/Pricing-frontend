import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_SHOW_FILTER,
} from './constants';

export function showFilter() {
  return {
    type: HOME_SHOW_FILTER,
  };
}

export function useShowFilter() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(showFilter(...params)), [dispatch]);
  return { showFilter: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SHOW_FILTER:
      return {
        ...state,
        showFilter: !state.showFilter
      };

    default:
      return state;
  }
}

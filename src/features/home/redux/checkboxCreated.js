import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_CHECKBOX_CREATED } from './constants';

export function checkboxCreated() {
  return {
    type: HOME_CHECKBOX_CREATED,
  };
}

export function useCheckboxCreated() {
  const dispatch = useDispatch();
  const toggleCreated = useSelector(state => state.home.status.created);
  const boundAction = useCallback((...params) => dispatch(checkboxCreated(...params)), [dispatch]);
  
  return {toggleCreated, checkboxCreated: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CHECKBOX_CREATED:
      return {
        ...state,
        toggleCreated: !this.state.status.created,
      };

    default:
      return state;
  }
}

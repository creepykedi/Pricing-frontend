import initialState from './initialState';
import { reducer as getInquiriesListReducer } from './getInquiriesList';
import { reducer as getContractorsListReducer } from './getContractorsList';
import { reducer as showFilterReducer } from './showFilter';
import { reducer as getPaymentDetailsReducer } from './getPaymentDetails';
import { reducer as checkboxCreatedReducer } from './checkboxCreated';

const reducers = [
  getInquiriesListReducer,
  getContractorsListReducer,
  showFilterReducer,
  getPaymentDetailsReducer,
  checkboxCreatedReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_INQUIRIES_LIST_BEGIN,
  HOME_GET_INQUIRIES_LIST_SUCCESS,
  HOME_GET_INQUIRIES_LIST_FAILURE,
  HOME_GET_INQUIRIES_LIST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getInquiriesList,
  dismissGetInquiriesListError,
  reducer,
} from '../../../../src/features/home/redux/getInquiriesList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getInquiriesList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getInquiriesList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getInquiriesList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_INQUIRIES_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_INQUIRIES_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getInquiriesList fails', () => {
    const store = mockStore({});

    return store.dispatch(getInquiriesList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_INQUIRIES_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_INQUIRIES_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetInquiriesListError', () => {
    const expectedAction = {
      type: HOME_GET_INQUIRIES_LIST_DISMISS_ERROR,
    };
    expect(dismissGetInquiriesListError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_INQUIRIES_LIST_BEGIN correctly', () => {
    const prevState = { getInquiriesListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_INQUIRIES_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInquiriesListPending).toBe(true);
  });

  it('handles action type HOME_GET_INQUIRIES_LIST_SUCCESS correctly', () => {
    const prevState = { getInquiriesListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_INQUIRIES_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInquiriesListPending).toBe(false);
  });

  it('handles action type HOME_GET_INQUIRIES_LIST_FAILURE correctly', () => {
    const prevState = { getInquiriesListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_INQUIRIES_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInquiriesListPending).toBe(false);
    expect(state.getInquiriesListError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_INQUIRIES_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getInquiriesListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_INQUIRIES_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInquiriesListError).toBe(null);
  });
});


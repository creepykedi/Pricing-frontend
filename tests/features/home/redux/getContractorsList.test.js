import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_CONTRACTORS_LIST_BEGIN,
  HOME_GET_CONTRACTORS_LIST_SUCCESS,
  HOME_GET_CONTRACTORS_LIST_FAILURE,
  HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getContractorsList,
  dismissGetContractorsListError,
  reducer,
} from '../../../../src/features/home/redux/getContractorsList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getContractorsList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getContractorsList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getContractorsList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CONTRACTORS_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CONTRACTORS_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getContractorsList fails', () => {
    const store = mockStore({});

    return store.dispatch(getContractorsList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CONTRACTORS_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CONTRACTORS_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetContractorsListError', () => {
    const expectedAction = {
      type: HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR,
    };
    expect(dismissGetContractorsListError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_CONTRACTORS_LIST_BEGIN correctly', () => {
    const prevState = { getContractorsListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_CONTRACTORS_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getContractorsListPending).toBe(true);
  });

  it('handles action type HOME_GET_CONTRACTORS_LIST_SUCCESS correctly', () => {
    const prevState = { getContractorsListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CONTRACTORS_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getContractorsListPending).toBe(false);
  });

  it('handles action type HOME_GET_CONTRACTORS_LIST_FAILURE correctly', () => {
    const prevState = { getContractorsListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CONTRACTORS_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getContractorsListPending).toBe(false);
    expect(state.getContractorsListError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getContractorsListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_CONTRACTORS_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getContractorsListError).toBe(null);
  });
});


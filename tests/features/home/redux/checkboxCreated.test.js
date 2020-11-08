import {
  HOME_CHECKBOX_CREATED,
} from '../../../../src/features/home/redux/constants';

import {
  checkboxCreated,
  reducer,
} from '../../../../src/features/home/redux/checkboxCreated';

describe('home/redux/checkboxCreated', () => {
  it('returns correct action by checkboxCreated', () => {
    expect(checkboxCreated()).toHaveProperty('type', HOME_CHECKBOX_CREATED);
  });

  it('handles action type HOME_CHECKBOX_CREATED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CHECKBOX_CREATED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

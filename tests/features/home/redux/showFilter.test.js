import {
  HOME_SHOW_FILTER,
} from '../../../../src/features/home/redux/constants';

import {
  showFilter,
  reducer,
} from '../../../../src/features/home/redux/showFilter';

describe('home/redux/showFilter', () => {
  it('returns correct action by showFilter', () => {
    expect(showFilter()).toHaveProperty('type', HOME_SHOW_FILTER);
  });

  it('handles action type HOME_SHOW_FILTER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SHOW_FILTER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

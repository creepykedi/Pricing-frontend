import React from 'react';
import { shallow } from 'enzyme';
import { Payments } from '../../../src/features/home/Payments';

describe('home/Payments', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Payments {...props} />
    );

    expect(
      renderedComponent.find('.home-payments').length
    ).toBe(1);
  });
});

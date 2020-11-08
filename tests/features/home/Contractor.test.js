import React from 'react';
import { shallow } from 'enzyme';
import { Contractor } from '../../../src/features/home/Contractor';

describe('home/Contractor', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Contractor {...props} />
    );

    expect(
      renderedComponent.find('.home-contractor').length
    ).toBe(1);
  });
});

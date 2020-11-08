import React from 'react';
import { shallow } from 'enzyme';
import { Inquiries } from '../../../src/features/home/Inquiries';

describe('home/Inquiries', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Inquiries {...props} />
    );

    expect(
      renderedComponent.find('.home-inquiries').length
    ).toBe(1);
  });
});

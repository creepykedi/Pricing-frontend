import React from 'react';
import { shallow } from 'enzyme';
import { CreatePaymentForm } from '../../../src/features/home/CreatePaymentForm';

describe('home/CreatePaymentForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreatePaymentForm {...props} />
    );

    expect(
      renderedComponent.find('.home-create-payment-form').length
    ).toBe(1);
  });
});

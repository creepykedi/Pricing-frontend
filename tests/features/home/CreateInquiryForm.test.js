import React from 'react';
import { shallow } from 'enzyme';
import { CreateInquiryForm } from '../../../src/features/home/CreateInquiryForm';

describe('home/CreateInquiryForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateInquiryForm {...props} />
    );

    expect(
      renderedComponent.find('.home-create-inquiry-form').length
    ).toBe(1);
  });
});

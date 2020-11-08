import React from 'react';
import { shallow } from 'enzyme';
import { InquirySearch } from '../../../src/features/home/InquirySearch';

describe('home/InquirySearch', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InquirySearch {...props} />
    );

    expect(
      renderedComponent.find('.home-inquiry-search').length
    ).toBe(1);
  });
});

import React from 'react';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import AddCategory from './AddCategory';


describe(`AddCategory component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<AddCategory />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
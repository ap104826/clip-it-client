import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddBookmark from './AddBookmark'

describe(`AddBookmark component`, () => {
  const stubCategories = [
    {
      "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Important"
    },
    {
      "id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Super"
    },
    {
      "id": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Spangley"
    }
  ]

  it('renders the complete form', () => {
    const wrapper = shallow(<AddBookmark />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it.skip('renders the select options from categories', () => {
    const context = { categories: stubCategories }
    const select = shallow(<AddBookmark />, context)
      .find('#bookmark-category-select')
    expect(toJson(select)).toMatchSnapshot()
  })
})

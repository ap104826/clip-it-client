import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BookmarkPageNav from './BookmarkPageNav'

describe(`NotePageNav component`, () => {
  const props = {
    category: {
      "name": "Important"
    }
  }

  it('renders a .BookmarkPageNav by default', () => {
    const wrapper = shallow(<BookmarkPageNav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a h3 with category name when in props', () => {
    const h3 = shallow(<BookmarkPageNav {...props} />)
      .find('.BookmarkPageNav__category-name')
    expect(toJson(h3)).toMatchSnapshot()
  })
})

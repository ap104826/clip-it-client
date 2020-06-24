import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BookmarkPageNav from './BookmarkPageNav'

describe(`BookmarkPageNav component`, () => {
  it('renders a .BookmarkPageNav by default', () => {
    const wrapper = shallow(<BookmarkPageNav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it.skip('renders a h3 with category name when in props', () => {
    const props = {
      match: {
        params: {
          bookmarkId: 'test-bookmark-id'
        }
      }
    }
    const context = {
      bookmarks: [{ id: 'test-bookmark-id', category_id: 'test-category-id' }],
      categories: [{ id: 'test-category-id', name: 'Important' }]
    }

    const h3 = shallow(<BookmarkPageNav {...props} />, context)
      .find('.BookmarkPageNav__category-name')
    expect(toJson(h3)).toMatchSnapshot()
  })
})

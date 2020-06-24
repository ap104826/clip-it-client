import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BookmarkPageMain from './BookmarkPageMain'

describe(`BookmarkPageMain component`, () => {
  it('renders a .BookmarkPageMain by default', () => {
    const wrapper = shallow(<BookmarkPageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it.skip('renders a Bookmark with bookmark prop', () => {
    const props = {
      match: {
        params: {
          bookmarkId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }
    const context = {
      bookmarks: [{
        id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
        name: `Dogs`,
        modified: `2019-01-03T00:00:00.000Z`,
        content: "Corporis accusamus placeat.\n \rUnde."
      }]
    }
    const bookmark = shallow(<BookmarkPageMain {...props} />, context)
      .find('Bookmark')
    expect(toJson(bookmark)).toMatchSnapshot()
  })

  it.skip(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    const props = {
      match: {
        params: {
          bookmarkId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }

    const bookmarksContextWithDifferentContent = [
      {
        bookmarks: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n r.\n \rafter n r.",
          }
        ]
      },
      {
        bookmarks: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n.\nafter."
          }
        ]
      }
    ]

    BookmarksContextWithDifferentContent.forEach(context => {
      const content = shallow(<BookmarkPageMain {...props} />, context)
        .find('BookmarkPageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})

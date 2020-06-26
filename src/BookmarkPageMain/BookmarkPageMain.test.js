import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BookmarkPageMain from './BookmarkPageMain'

describe(`BookmarkPageMain component`, () => {
  const props = {
    bookmark: {
      id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
      name: `Dogs`,
      modified: `2019-01-03T00:00:00.000Z`,
      content: "Corporis accusamus placeat.\n \rUnde."
    }
  }
  it('renders a .BookmarkPageMain by default', () => {
    const wrapper = shallow(<BookmarkPageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Bookmark with bookmark prop', () => {
    const bookmark = shallow(<BookmarkPageMain {...props} />)
      .find('Bookmark')
    expect(toJson(bookmark)).toMatchSnapshot()
  })

  it(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    [{
      bookmark: { "content": "Content with n r.\n \rafter n r." }
    }, {
      bookmark: { "content": "Content with n.\nafter." }
    }].forEach(props => {
      const content = shallow(<BookmarkPageMain {...props} />)
        .find('BookmarkPageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})


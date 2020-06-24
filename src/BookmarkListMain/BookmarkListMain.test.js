import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BookmarkListMain from './BookmarkListMain'

describe(`BookmarkListMain component`, () => {
  it('renders a .BookmarkListMain by default', () => {
    const wrapper = shallow(<BookmarkListMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it.skip('renders a Bookmark in ul for each bookmarks in array', () => {
    const props = {
      match: {
        params: {
          category_id: 'THIS_CATEGORY_ID'
        }
      }
    }
    const context = {
      bookmarks: [
        {
          "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Dogs",
          "modified": "2019-01-03T00:00:00.000Z",
          "category_id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Corporis accusamus placeat.\n \rUnde."
        },
        {
          "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Cats",
          "modified": "2018-08-15T23:00:00.000Z",
          "category_id": "THIS_CATEGORY_ID",
          "content": "Eos\n \rlaudantium."
        },
        {
          "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Pigs",
          "modified": "2018-03-01T00:00:00.000Z",
          "category_id": "THIS_CATEGORY_ID",
          "content": "Occaecati dignissimos\nvoluptatum nihil."
        },
        {
          "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Birds",
          "modified": "2019-01-04T00:00:00.000Z",
          "category_id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Eum culpa odit."
        },
      ]
    }
    const ul = shallow(<BookmarkListMain {...props} />, context)
      .find('ul')
    expect(toJson(ul)).toMatchSnapshot()
  })
})

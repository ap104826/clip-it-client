

import React from 'react'
import ReactDOM from 'react-dom'
import BookmarkPageNav from './BookmarkPageNav'

describe.only("BookmarkPageNav renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BookmarkPageNav />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

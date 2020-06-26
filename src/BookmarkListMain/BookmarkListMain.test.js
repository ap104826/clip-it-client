import React from 'react'
import ReactDOM from 'react-dom'
import BookmarkListMain from './BookmarkListMain'

describe.only("BookmarkListMain renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BookmarkListMain />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

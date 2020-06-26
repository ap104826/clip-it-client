import React from 'react'
import ReactDOM from 'react-dom'
import CategoryListNav from './CategoryListNav'

describe.only("CategoryListNav renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <CategoryListNav />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})





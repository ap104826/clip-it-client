import React from 'react'
import ReactDOM from 'react-dom'
import AddCategory from './AddCategory'


describe.only("AddCategory renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AddCategory />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

import React from 'react'
import ReactDOM from 'react-dom'
import ClipitForm from './ClipitForm'

describe.only("ClipitForm renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ClipitForm />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})





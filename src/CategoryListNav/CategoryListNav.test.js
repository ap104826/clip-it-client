import React from 'react'
import ReactDOM from 'react-dom'
import CategoryListNav from './CategoryListNav'
import { BrowserRouter } from 'react-router-dom'


describe.only("CategoryListNav renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <CategoryListNav />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})





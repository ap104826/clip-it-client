import React from 'react'
import ReactDOM from 'react-dom'
import Bookmark from './bookmark'


import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faTrash, faChevronLeft, faTrashAlt, faCheckDouble, faBookmark, faShare, faHeart as fasHeart
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons'

library.add(faPlus, fasHeart, farHeart, faChevronLeft, faTrash, faTrashAlt, faCheckDouble, faBookmark, faShare)

describe.only("App renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Bookmark />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

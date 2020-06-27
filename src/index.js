import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faTrash, faChevronLeft, faTrashAlt, faCheckDouble, faBookmark, faShare, faHeart as fasHeart
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import './index.css'
import App from './App/App'
import {
  faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons'

library.add(faPlus, fasHeart, farHeart, faChevronLeft, faTrash, faTrashAlt, faCheckDouble, faBookmark, faShare)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

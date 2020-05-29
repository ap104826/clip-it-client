import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faBookmark
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import './index.css'
import App from './App/App'

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faBookmark)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faTrash, faChevronLeft, faTrashAlt, faCheckDouble, faBookmark, faShare
} from '@fortawesome/free-solid-svg-icons'
import { HashRouter } from 'react-router-dom'
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap-overrides.css'
import './index.css'
import App from './App/App'
import { Container } from 'react-bootstrap'

library.add(faPlus, faTrash, faChevronLeft, faTrashAlt, faCheckDouble, faBookmark, faShare)

ReactDOM.render(
  <HashRouter>
    <Container fluid>
      <App />
    </Container>
  </HashRouter>,
  document.getElementById('root')
)

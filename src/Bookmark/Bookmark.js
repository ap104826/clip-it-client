import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import { Button, Card } from 'react-bootstrap'
import image1 from '../images/1.jpg'

import config from '../config'
import './Bookmark.css'

export default class Bookmark extends React.Component {
  static defaultProps = {
    onDeleteBookmark: () => { },
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    // fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(() => {
    this.context.deleteBookmark(bookmarkId)
    // allow parent to perform extra behaviour
    // this.props.onDeleteBookmark(bookmarkId)
    // })
    // .catch(error => {
    //   console.error({ error })
    // })
  }

  render() {
    const { title, id, modified, category_id, thumbnail_url } = this.props
    return (
      <Card style={{ width: '18rem' }} key={id}>
        <Card.Img variant="top" src={image1} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Button variant="danger" onClick={this.handleClickDelete}>Delete</Button>
        </Card.Body>
      </Card>
    )
  }
}

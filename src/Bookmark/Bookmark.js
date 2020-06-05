import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import { Button, Card } from 'react-bootstrap'
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
    const { title, id, modified, category_id, link, thumbnail_url } = this.props
    return (
      <Card key={id}>
        <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/${thumbnail_url}`} />
        <Card.Body>
          <Card.Title className='Bookmark__title'>
            <a href={link}>{title}</a>
          </Card.Title>
          <Button variant="danger" onClick={this.handleClickDelete}>Delete</Button>
        </Card.Body>
      </Card>
    )
  }
}

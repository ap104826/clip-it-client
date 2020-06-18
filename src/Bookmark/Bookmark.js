import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import { Card, Container, Row, Col } from 'react-bootstrap'
import config from '../config'
import './Bookmark.css'

export default class Bookmark extends React.Component {
  static defaultProps = {
    onDeleteBookmark: () => { }
  }
  static contextType = ApiContext;

  handleClickFavorite = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    this.context.favoriteBookmark(bookmarkId)

  }

  handleClickDelete = e => {
    e.preventDefault()
    const bookmarkId = this.props.id

    this.context.showDeleteBookmarkConfirmationModal('Are you sure you want to delete this bookmark?', bookmarkId)
  }

  getCategoryFromCategoryId(categoryId) {

    if (!categoryId) {
      return { name: '' }
    }

    const category = this.context.categories.find(category => category.id === categoryId)

    if (!category) {
      return { name: undefined }
    }

    return category
  }

  render() {
    const { title, id, modified, category_id, link, thumbnail_url, is_favorite } = this.props
    console.log('is_favorite', is_favorite)
    return (
      <Card key={id} style={{ width: '18rem' }} className='Bookmark'>
        <Card.Img variant="top" src={`${thumbnail_url}`} />
        <Card.Body>
          <Card.Title className='Bookmark__title'>
            <a href={link} target='_blank'>{title}</a>
          </Card.Title>
          {/* <Container>
            <Row className='align-items-center'>
              <Col className='p-0'>
                <span className={`${category_id ? 'Bookmark__category' : 'Bookmark__category d-none'}`}>
                  {this.getCategoryFromCategoryId(category_id).name}
                </span>
              </Col>
              <Col className='p=0 text-center'>
                <FontAwesomeIcon icon={[is_favorite ? 'fas' : 'far', 'heart']} onClick={this.handleClickFavorite} />
              </Col>
              <Col className='p-0 text-right'>
                <button className="ClipIt__btn ClipIt__btn-primary" onClick={this.handleClickDelete}>Delete</button>
              </Col>
            </Row>
          </Container> */}
          <div className="Bookmark__footer">
            <span className={`${category_id ? 'Bookmark__category' : 'Bookmark__category visibility-hidden'}`}>
              {this.getCategoryFromCategoryId(category_id).name}
            </span>
            <FontAwesomeIcon icon={[is_favorite ? 'fas' : 'far', 'heart']} onClick={this.handleClickFavorite} />
            <button className="ClipIt__btn ClipIt__btn-primary" onClick={this.handleClickDelete}>Delete</button>

          </div>

        </Card.Body>
      </Card>
    )
  }
}

import React from 'react'
import Bookmark from '../Bookmark/Bookmark'
import ApiContext from '../ApiContext'
import { getBookmarksForCategory } from '../bookmarks-helpers'
import './BookmarkListMain.css'
import { Container, Col, Row } from 'react-bootstrap'

export default class BookmarkListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  categorySelected(e) {
    const categoryId = e.target.value
    if (categoryId == 'all') {
      this.props.history.push('/')
      return
    }

    this.props.history.push(`/category/${categoryId}`)

  }

  render() {
    const { category_id } = this.props.match.params
    const { bookmarks = [], categories = [] } = this.context
    const bookmarksForCategories = getBookmarksForCategory(bookmarks, parseInt(category_id))
    return (
        <Container fluid className='mt-4'>
        <Row className='d-sm-none'>
            <Col className='text-center'>
              <label>Categories</label>
              <select className='ml-1 ' onChange={(e) => this.categorySelected(e)} value={category_id}>
                <option key='all' value='all'>All</option>
                {categories.map(category =>
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )}
              </select>
            </Col>
          </Row>
        <Row className='BookmarkList justify-content-center justify-content-sm-start'>
            {bookmarksForCategories.map(bookmark =>
              <Col xs='auto' key={bookmark.id}>
                <Bookmark
                  id={bookmark.id}
                  title={bookmark.title}
                  link={bookmark.link}
                  category_id={bookmark.category_id}
                  modified={bookmark.modified}
                  thumbnail_url={bookmark.thumbnail_url}
                  is_favorite={bookmark.is_favorite}
                />
              </Col>
            )}
          </Row>
        </Container>
    )
  }
}

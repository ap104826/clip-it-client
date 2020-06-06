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

  render() {
    const { category_id } = this.props.match.params
    const { bookmarks = [] } = this.context
    const bookmarksForCategories = getBookmarksForCategory(bookmarks, parseInt(category_id))
    return (
        <Container fluid className='mt-4'>
        <Row className='d-sm-none'>
            <Col>
              <label>Categories</label>
              <select>
                <option>All</option>
              </select>
            </Col>
          </Row>
          <Row className='BookmarkList'>
            {bookmarksForCategories.map(bookmark =>
              <Col xs='auto' key={bookmark.id}>
                <Bookmark
                  id={bookmark.id}
                  title={bookmark.title}
                  link={bookmark.link}
                  category_id={bookmark.category_id}
                  modified={bookmark.modified}
                  thumbnail_url={bookmark.thumbnail_url}
                />
              </Col>
            )}
          </Row>
        </Container>
    )
  }
}

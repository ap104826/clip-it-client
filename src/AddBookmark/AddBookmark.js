import React, { Component } from 'react'
import ClipitForm from '../ClipitForm/ClipitForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddBookmark.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'


export default class AddBookmark extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  state = {
    validated: false
  }

  handleSubmit = e => {

    const form = e.currentTarget
    const bookmarkName = e.target['bookmark-link'].value
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      this.setState({ validated: true })
    }

    if (!bookmarkName) {
      return
    }

    const bookmark = {
      id: this.context.bookmarks.length + 1,
      name: bookmarkName
    }
    e.preventDefault()
    const newBookmark = {
      link: bookmarkName,
      category_id: parseInt(e.target['bookmark-category-id'].value)
    }
    fetch(`${config.API_ENDPOINT}/bookmarks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBookmark),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(bookmark => {
        this.context.addBookmark(bookmark)
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { categories = [] } = this.context
    return (
      <section className='AddBookmarks'>
        <Container>
          <Row>
            <Col>
              <h2>Create a Bookmark</h2>
              <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group controlId="addBookmark">
                  <Form.Label>Link</Form.Label>
                  <Form.Control type="text" required name='bookmark-link' placeholder="google.com" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a bookmark.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="bookmark-category-select">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name='bookmark-category-id'>
                    <option value={null}>...</option>
                    {categories.map(category =>
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>

                <Button variant="secondary" onClick={() => this.props.history.goBack()}>
                  Cancel
                </Button>
                <Button className='ml-1' variant="primary" type="submit">
                  Add bookmark
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>



      </section>
    )
  }
}

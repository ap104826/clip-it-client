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

  handleSubmit = e => {
    e.preventDefault()
    const newBookmark = {
      id: Math.random() * 100,
      link: e.target['bookmark-link'].value,
      category_id: parseInt(e.target['bookmark-category-id'].value),
    }
    // fetch(`${config.API_ENDPOINT}/categories`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(newBookmark),
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(bookmark => {
    this.context.addBookmark(newBookmark)
    this.props.history.push(`/`)
      // })
      // .catch(error => {
      //   console.error({ error })
      // })
  }

  render() {
    const { categories = [] } = this.context
    return (
      <section className='AddBookmarks'>
        <Container>
          <Row>
            <Col>
              <h2>Create a bookmark</h2>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group controlId="bookmark-link">
                  <Form.Label>Link</Form.Label>
                  <Form.Control type="text" name='bookmark-link' placeholder="google.com" />
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


        {/* <ClipitForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='bookmark-link-input'>
              Link
            </label>
            <input type='text' id='bookmark-link-input' name='bookmark-link' />
          </div>
          <div className='field'>
            <label htmlFor='bookmark-category-select'>
              Category
            </label>
            <select id='bookmark-category-select' name='bookmark-category-id'>
              <option value={null}>...</option>
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add bookmark
            </button>
          </div>
        </ClipitForm> */}
      </section>
    )
  }
}

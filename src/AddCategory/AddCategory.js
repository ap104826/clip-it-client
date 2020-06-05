import React, { Component } from 'react'
import ClipitForm from '../ClipitForm/ClipitForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddCategory.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

export default class AddCategory extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const category = {
      id: Math.random() * 100,
      name: e.target['category-name'].value
    }
    // fetch(`${config.API_ENDPOINT}/categories`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(category),
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(category => {
    //     this.context.addCategory(category)
    //     this.props.history.push(`/category/${category.id}`)
    //   })
    //   .catch(error => {
    //     console.error({ error })
    //   })
        this.context.addCategory(category)
        this.props.history.push(`/`)
  }

  render() {
    return (
      <section className='AddCategory'>

        <Container>
          <Row>
            <Col>
              <h2>Create a Category</h2>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group controlId="addCategory">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name='category-name' placeholder="travel, food, etc." />
                </Form.Group>

                <Button variant="secondary" onClick={() => this.props.history.goBack()}>
                  Cancel
                </Button>
                <Button className='ml-1' variant="primary" type="submit">
                  Add category
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>

      </section>
    )
  }
}

import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countBookmarksForCategory } from '../bookmarks-helpers'
import './CategoryListNav.css'
import { Badge } from 'react-bootstrap'
import config from '../config'


export default class CategoryListNav extends React.Component {
  static defaultProps = {
    onDeleteCategory: () => { },
  }
  static contextType = ApiContext;
 

  handleClickDelete = (e, categoryId) => {
    e.preventDefault()

    fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(() => {
        this.context.deleteCategory(categoryId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { categories = [], bookmarks = [] } = this.context
    return (
      <div className='CategoryListNav'>
        <ul className='CategoryListNav__list'>
          <li key='all'>
            <NavLink
              exact={true}
              className='CategoryListNav__category-link'
              to={`/`}
            >
              All
              <Badge variant="light" className="ml-1">
                {countBookmarksForCategory(bookmarks, null)}
              </Badge>
            </NavLink>
          </li>
          {categories.map(category =>
            <li key={category.id}>
              <NavLink
                className='CategoryListNav__category-link'
                to={`/category/${category.id}`}
              >
                {category.name}
                <Badge variant="light" className="ml-1">
                  {countBookmarksForCategory(bookmarks, category.id)}
                </Badge>
                <a className='ml-1' onClick={(e) => this.handleClickDelete(e, category.id)}>
                  <FontAwesomeIcon  icon='trash' />
                </a>
                
                {/* <a type="Delete" class="m1-0 icon-remove" ></a> */}
               
              </NavLink>
            </li>
          )}
        </ul>

      </div>
    )
  }
}

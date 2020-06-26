import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Category from './Category';
import { BrowserRouter as BR } from 'react-router-dom';


describe('Category component', () => {
  const props = {
    category: [{
      name: 'some name',
      id: 'id',
    }]
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BR><Category {...props} /></BR>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const category = renderer.create(<BR><Category {...props} /></BR>);

    expect(category.toJSON()).toMatchSnapshot();
  });
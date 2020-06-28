import React from 'react'
import ReactDOM from 'react-dom'
import CircleButton from './CircleButton'

describe.only("CircleButton renders properly", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <CircleButton />,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})

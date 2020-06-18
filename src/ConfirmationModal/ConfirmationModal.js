import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class ConfirmationModal extends Component {
    render() {
        return (<Modal show={this.props.show} onHide={() => this.props.handleConfirmationModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.message}</Modal.Body>
            <Modal.Footer>
                <button className="ClipIt__btn ClipIt__btn-secondary" onClick={() => this.props.handleConfirmationModal(false)}>
                    Close
                </button>
                <button className="ClipIt__btn ClipIt__btn-primary" onClick={() => this.props.handleConfirmationModal(true)}>
                    Ok
                </button>
            </Modal.Footer>
        </Modal>)
    }
}

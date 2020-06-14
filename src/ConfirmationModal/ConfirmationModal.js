import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default class ConfirmationModal extends Component {
    render() {
        return (<Modal show={this.props.show} onHide={() => this.props.handleConfirmationModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.handleConfirmationModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => this.props.handleConfirmationModal(true)}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>)
    }
}

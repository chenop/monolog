import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class ModalWrapper extends Component {

  render(props) {
    let {show, title, closeBtnLabel, onClose, children} = this.props;

    return (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {children}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={()=>onClose()}>{closeBtnLabel}</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default ModalWrapper;

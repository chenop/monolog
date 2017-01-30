import React, {Component} from 'react';
import ModalWrapper from './ModalWrapper.jsx';
import {Glyphicon} from 'react-bootstrap';

class ErrorMessage extends Component {

  render(props) {
    let {show, onClose, message} = this.props;

    return (
      <ModalWrapper
        show={show}
        title={<span style={{color: 'red'}}><Glyphicon glyph="exclamation-sign" /> {message.title}</span>}
        onClose={onClose}
        closeBtnLabel="Dismiss">
        <div dangerouslySetInnerHTML={
          {__html: message.text}
        } />
        </ModalWrapper>
    );
  }
}

export default ErrorMessage;

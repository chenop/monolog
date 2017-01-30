import React, {Component} from 'react';
import {connect} from 'react-redux';
import config, {initialState} from '../config';
import * as loginActions from '../actions/login';
import {Modal, Col, Button, FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'Europe\\',
      password: '',
      host: initialState.credentials.host,
      port: initialState.credentials.port,
      path: initialState.credentials.path,
      parseExp: config.log.parseExpression
    }
  }

  render(props) {

    let {host, port, path, username, parseExp} = this.state;

    return (
      <Modal bsSize="large" show={true}>
        <Modal.Header>
          <Modal.Title><Glyphicon glyph="list-alt" /> MonoLog</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <FormGroup>
              <InputGroup>
                 <InputGroup.Addon>Username</InputGroup.Addon>
                 <FormControl placeholder="Example: Europe\user.name" defaultValue={username} onChange={(e)=> this.setState({username: e.target.value})} type="text" />
               </InputGroup>
            </FormGroup>

            <FormGroup>
               <InputGroup>
                <InputGroup.Addon>Password</InputGroup.Addon>
                <FormControl onChange={(e)=> this.setState({password: e.target.value})} type="password" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
               <InputGroup>
                <InputGroup.Addon>Host</InputGroup.Addon>
                <FormControl defaultValue={host} onChange={(e)=> this.setState({host: e.target.value})} type="text" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
               <InputGroup>
                <InputGroup.Addon>Port</InputGroup.Addon>
                <FormControl defaultValue={port} onChange={(e)=> this.setState({port: e.target.value})} type="text" />
              </InputGroup>
            </FormGroup>

          <FormGroup>
             <InputGroup>
              <InputGroup.Addon>Path</InputGroup.Addon>
              <FormControl placeholder="Example: /var/log/tat/toluna.log" defaultValue={path} onChange={(e)=> this.setState({path: e.target.value})} type="text" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
             <InputGroup>
              <InputGroup.Addon>Parse expression</InputGroup.Addon>

              <FormControl
                placeholder="An escaped regular expression used to parse log entries text (optional). Not need for wrapping slashes. Example: LogLevel\]([\s\S]*)\+\+\+Context"
                componentClass="textarea"
                defaultValue={parseExp}
                onChange={(e)=> this.setState({parseExp: e.target.value})}
               />
            </InputGroup>
          </FormGroup>


        </Modal.Body>

        <Modal.Footer>
          <Col
            xs={6}
            style={{
            lineHeight: '2em',
            textAlign: 'left'
          }}>

          </Col>
          <Col xs={6}>
            <Button
              disabled={!this.state.username || !this.state.password}
              className="pull-right"
              onClick={
              () => {
              this.props.isLoading();
              this.props.login({
                username: this.state.username,
                password: this.state.password,
                host: this.state.host,
                port: this.state.port,
                path: this.state.path,
                parseExp: this.state.parseExp
              });
              }
            }>Monitor</Button>
          </Col>


        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(loginActions.login(credentials));
    },
    isLoading: () => dispatch(loginActions.loading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

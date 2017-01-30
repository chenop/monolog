import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as filtersActions from '../actions/filters';
import * as settingsActions from '../actions/settings';

import {
  Nav,
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  FormGroup,
  InputGroup,
  FormControl,
  Badge,
  Button,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
//import logo from '../assets/images/tqs_logo2016.png';


class Toolbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customMachine: ''
    }
  }

  determineMachineName(machines, machineId) {
    if (machineId === 0)
      return 'Any';
    if (machines[machineId])
      return machines[machineId].label;
    return machineId;
  }

  render(props) {
    let {
      machine,
      counters,
      logLevel,
      bufferSize,
      monitorState,
      config
    } = this.props;
    let {errorLevels, machines, bufferSizes, monitorStateModes} = config;

    return (
      <Navbar fixedTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            mono<strong>Log</strong>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={(eventKey, evt)=>{
            //LogLevel
            if (logLevel.indexOf(eventKey) > -1) this.props.removeLogLevel(eventKey);
            else
              this.props.addLogLevel(eventKey);
          }}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip_dropdown_logLevel">Add/remove log levels filters</Tooltip>}>
            <NavDropdown title={<span><Glyphicon glyph="stats" /> LogLevel ({logLevel.length})</span>} id="basic-nav-dropdown">
              {
                errorLevels.map((errorLevel) =>
                <MenuItem
                  disabled={errorLevel.disabled}
                  key={errorLevel.key}
                  eventKey={errorLevel.key}>

                    { logLevel.indexOf(errorLevel.key) > -1
                      ? <span className="text-primary"><strong>{errorLevel.label}</strong></span>
                      : <span>{errorLevel.label}</span>
                    }

                </MenuItem>
                )
              }
            </NavDropdown>
          </OverlayTrigger>

          </Nav>
          <Nav onSelect={(eventKey, evt)=>{
            //Machine
            if (eventKey === 9 && !this.state.customMachine) return;
            this.props.changeMachine(eventKey, eventKey === 9 ? this.state.customMachine : null);
          }}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip_dropdown_machine">Filter by preset machine name.<br/>You can also apply custom filter using RegEx</Tooltip>}>
            <NavDropdown title={<span><Glyphicon glyph="cd" /> {`Machine: ${this.determineMachineName(machines, machine)}`}</span>} id="basic-nav-dropdown">
              {machines.map((machine) => <MenuItem key={machine.key} eventKey={machine.key}>{machine.label}</MenuItem>)}
              <MenuItem key={9} eventKey={9}>
                <FormGroup>
                  <InputGroup>
                    <FormControl
                      placeholder="Custom"
                      onClick={(e)=>{
                        e.stopPropagation(); e.preventDefault();
                      }}
                      type="text"
                      defaultValue=""
                      onChange={(e)=>{
                        this.setState({customMachine: e.target.value});
                      }}/>
                    <InputGroup.Button>
                      <Button disabled={!this.state.customMachine} >
                        <span><Glyphicon glyph="ok" /></span>
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </MenuItem>
            </NavDropdown>
          </OverlayTrigger>
          </Nav>
          <Nav onSelect={(eventKey, evt)=>{
            this.props.changeBufferSize(eventKey);
          }}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip_dropdown_buffer">Select maxium log entries allowed in buffer</Tooltip>}>
            <NavDropdown title={<span><Glyphicon glyph="list-alt" /> {`Buffer: ${bufferSize}`}</span>} id="basic-nav-dropdown">
              {bufferSizes.map((size) => <MenuItem key={size.key} disabled={size.disabled} eventKey={size.key}>{size.label}</MenuItem>)}
            </NavDropdown>
          </OverlayTrigger>
          </Nav>
          <Nav onSelect={(eventKey, evt)=>{
            this.props.toggleMoreSettings();
          }}>
            <NavItem eventKey={1} href="#"><span><Glyphicon glyph="cog" /></span> More</NavItem>
          </Nav>
          <Nav pullRight>
            <Navbar.Form>
              <FormGroup bsSize="small">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip_button_logplaypause">Toggle monitor state ACTIVE/PAUSED</Tooltip>}>
                <Button
                  bsStyle={monitorState > 0 ? 'success' : 'danger'}
                  bsSize="xs"
                  onClick={(e)=>{
                    this.props.changeMonitorState(monitorState);
                  }}>
                  <Glyphicon glyph={monitorState > 0 ? 'play' : 'pause'} />&nbsp;
                  {monitorStateModes[monitorState]}

                </Button>
              </OverlayTrigger>
              &nbsp;
              </FormGroup>
              <FormGroup bsSize="small">
                {
                  errorLevels.map((errorLevel) => {
                    return errorLevel.key && counters[errorLevel.key]
                    ? <span
                      key={errorLevel.key}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip id={errorLevel.key}>{errorLevel.type}</Tooltip>}>
                          <Badge style={{background: errorLevel.color}}>
                            {counters[errorLevel.type] || 0}
                          </Badge>
                        </OverlayTrigger>&nbsp;
                      </span>
                    : null;
                  })
                }
              </FormGroup>
              <FormGroup bsSize="small">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip_input_openfilter">Filter current log entries. <br/>This is an additonal filter over the others</Tooltip>}>
                  <FormControl type="text" placeholder="Filter log entries"
                    onChange={(e)=>{
                      this.props.changeFilterExpression(e.target.value);
                    }}
                  />
              </OverlayTrigger>
              </FormGroup>
            </Navbar.Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    machine: state.machine,
    logLevel: state.logLevel,
    bufferSize: state.bufferSize,
    monitorState: state.monitorState
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeMachine: (machineId, customMachine) => (dispatch(filtersActions.changeMachine(machineId, customMachine))),
    addLogLevel: (logLevel) => (dispatch(filtersActions.addLogLevel(logLevel))),
    removeLogLevel: (logLevel) => (dispatch(filtersActions.removeLogLevel(logLevel))),
    changeBufferSize: (size) => (dispatch(settingsActions.changeBufferSize(size))),
    changeFilterExpression: (expression) => (dispatch(filtersActions.changeFilterExpression(expression))),
    changeMonitorState: (state) => (dispatch(settingsActions.changeMonitorState(state))),
    toggleMoreSettings: () => (dispatch(settingsActions.toggleMoreSettings()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

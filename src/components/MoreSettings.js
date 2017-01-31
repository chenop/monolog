import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as settingsActions from '../actions/settings';
import ModalWrapper from './ModalWrapper.jsx';
import {Button, Tabs, Tab, Col, FormGroup, FormControl, InputGroup, Table, Label, Glyphicon} from 'react-bootstrap';

class MoreSettings extends Component {

  constructor(props) {
    super(props);
    this.state= {
      newFilter: ''
    }
  }

  render(props) {
    let {filters, hideKnown, show, toggleMoreSettings, toggleHideKnown} = this.props;

    return (
      <ModalWrapper
        show={show}
        title={<span><Glyphicon glyph="cog" /> More Settings</span>}
        onClose={toggleMoreSettings}
        closeBtnLabel="Done">
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title={<span><Glyphicon glyph="filter" /> Filters</span>}>
                  <Col>
                    <p className="text-muted small" style={{padding:10}}>
                      You can add custom filters using regular expressions. Each filter's action can be toggled
                      as either log entry MUST pass the RegEx test <i className="text-info">(MUST CONTAIN)</i>&nbsp;
                      or MUST NOT pass the RegEx test <i className="text-info">(MUST NOT CONTAIN)</i>.
                      In addition, each filter added can be toggled active/disabled or be removed entirely from the list.
                      Any filter you add will be&nbsp; <Label bsStyle="info"><Glyphicon glyph="filter" /> #1 highlighted</Label>&nbsp;
                       in the log entries UI.
                    </p>
                    <FormGroup>
                      <InputGroup>
                        <FormControl
                          onChange={(e)=>this.setState({newFilter:e.target.value})}
                          type="text"
                          placeholder="Add filter text/RegExp" />
                        <InputGroup.Button>
                          <Button disabled={!this.state.newFilter} onClick={(e) => {
                            this.props.addCustomFilterRule(this.state.newFilter);
                            this.setState({newFilter: ''});
                            }}>
                            <span><Glyphicon glyph="plus" /> Add</span>
                          </Button>
                        </InputGroup.Button>
                      </InputGroup>
                    </FormGroup>

                    {filters.length ?
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Filter</th>
                            <th>State</th>
                            <th>Mode</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            filters.map((filter, index) => {
                              return (
                                <tr key={index}>
                                  <td>{(index+1)}</td>
                                  <td title={filter.expression}>
                                    {
                                      filter.expression.length > 35 ?
                                      filter.expression.substr(0, 32) + '...' :
                                      filter.expression
                                    }
                                  </td>
                                  <td>
                                    <Button
                                      bsSize="xsmall"
                                      onClick={()=> {
                                        this.props.toggleCustomFilterRule(index);
                                    }}>
                                      {
                                        filter.active ?
                                        <Label bsStyle="success"><span><Glyphicon glyph="ok" /> ACTIVE</span></Label> :
                                        <Label bsStyle="danger"><span><Glyphicon glyph="remove" /> DISABLED</span></Label>
                                      }
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      bsSize="xsmall"
                                      onClick={()=> {
                                      this.props.invertCustomFilterRule(index);
                                    }}>
                                      {filter.not ? 'MUST NOT CONTAIN' : 'MUST CONTAIN'}
                                    </Button>
                                  </td>
                                  <td><Button bsSize="xsmall"
                                    onClick={()=> {
                                      this.props.removeCustomFilterRule(index);
                                    }}
                                    ><span><Glyphicon glyph="trash" /> Remove</span></Button></td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </Table> : null
                    }
                  </Col>
              </Tab>
              <Tab eventKey={2} title={<span><Glyphicon glyph="search" /> Display</span>}>

                <p className="text-muted small" style={{padding:10}}>
                  Hide known issue from the log UI. Known issues are defined in the app conifguration.
                  <label>
                    <input type="checkbox" checked={hideKnown} onChange={() => toggleHideKnown()} />  Hide known issues
                  </label>
                </p>


              </Tab>
            </Tabs>
        </ModalWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.moreSettingsModalVisible,
    filters: state.filters,
    hideKnown: state.hideKnown
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleMoreSettings: () => dispatch(settingsActions.toggleMoreSettings()),
    addCustomFilterRule: (rule) => dispatch(settingsActions.addCustomFilterRule(rule)),
    removeCustomFilterRule: (index) => dispatch(settingsActions.removeCustomFilterRule(index)),
    toggleCustomFilterRule: (index) => dispatch(settingsActions.toggleCustomFilterRule(index)),
    invertCustomFilterRule: (index) => dispatch(settingsActions.invertCustomFilterRule(index)),
    toggleHideKnown: () => dispatch(settingsActions.toggleHideKnown())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreSettings);

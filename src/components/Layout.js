import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import LogEntryList from './LogEntryList';
import Toolbar from './Toolbar';
import MoreSettings from './MoreSettings';
import Spinner from 'react-spinkit';
import MonologConfig from '../config';
import '../assets/styles/App.css';

class Layout extends Component {

  render(props) {
    let {
      counters,
      filter,
      itemsToLog,
      hideKnown,
      moreSettingsModalVisible,
      filters,
      isLoading
    } = this.props.state;

    return (
      <div className="App">
        {
          isLoading
          ? <div className="preloader">
              Loading, please wait...
              <Spinner spinnerName='double-bounceaa' noFadeIn /> 
          </div>
          : <div>
            <Toolbar
              config={MonologConfig}
              counters={counters}
             />
            <Grid>
              <Row className="show-grid">
                <Col xs={12} style={{paddingTop:70}}>
                    <LogEntryList items={itemsToLog} filter={filter} filters={filters || []} hideKnown={hideKnown} />
                </Col>
              </Row>
            </Grid>
            <MoreSettings
              show={moreSettingsModalVisible}
              filters={filters}
            />
          </div>
        }
      </div>
    );
  }
}

export default Layout;

import React from 'react';
import {ListGroup} from 'react-bootstrap';
import LogEntry from './LogEntry';

export default class LogEntryList extends React.Component {

  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(items, filter, filters, hideKnown) {
    return items &&
    Object.keys(items)
    .reverse()
    .map((key) => {
      if (items[key].isKnown && hideKnown)
        return null;

      let filterRx = new RegExp(filter);
      if (filterRx.test(key)){
        return <LogEntry isKnown={items[key].isKnown} entryType={items[key].entryType} key={key} signature={items[key].signature} filters={filters} content={key}></LogEntry>
      }

      return null;
    });
  }

  render(props) {
    let {items, filter, filters, hideKnown} = this.props;
    return (
        <ListGroup fill>
            {this.renderItems(items, filter, filters, hideKnown)}
        </ListGroup>
    );
  }
}

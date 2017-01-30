import React from 'react';
import {Row, Col, Panel, Badge, Glyphicon} from 'react-bootstrap';

export default class LogEntry extends React.Component {

  setHtml(content) {
    return {__html: content};
  }

  renderHeader(signature, isKnown, entryType) {

    return (
      <Row>
        <Col style={isKnown ? {color: '#cccccc'} : null}>
          {
            signature.length > 90
            ? `${signature.substr(0, 87)} ...`
            : signature
          }
          {isKnown ?
            <Badge
              style={{background: '#cccccc'}}
              className="pull-right"><Glyphicon glyph="ok" /> Known</Badge>
            : null
          }

          <Badge
            style={isKnown ? {background: '#cccccc'} : null}
            className="pull-right"><Glyphicon glyph="exclamation-sign" /> {entryType}</Badge>&nbsp;
        </Col>
      </Row>
    )
  }

  render(props) {
    let {content, signature, filters, isKnown, entryType} = this.props;
    let filteredContent = content;

    filters && filters.map((filter, index) => {
      if (filter.active) {
        let regex = new RegExp(filter.expression, 'gi');
        filteredContent = filteredContent.replace(regex,
          `<Label class="label label-info">
            <span class="glyphicon glyphicon-filter"></span> #${(index+1)} ${filter.expression}
          </Label>`
        );
      }
      return filteredContent;
    });


    return (
        <Panel collapsible defaultExpanded={!isKnown}
          bsStyle={isKnown ? 'default' : 'info'}
          header={this.renderHeader(signature, isKnown, entryType)}>
          <pre dangerouslySetInnerHTML={this.setHtml(filteredContent)}></pre>
        </Panel>
    );
  }
}

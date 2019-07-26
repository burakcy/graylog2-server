import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import styles from './HelpPanel.css';

class HelpPanel extends React.Component {
  static propTypes = {
    bsStyle: PropTypes.oneOf(['success', 'warning', 'danger', 'info', 'default', 'primary']),
    children: PropTypes.node,
    className: PropTypes.string,
    collapsible: PropTypes.bool,
    header: PropTypes.node,
    title: PropTypes.string,
  };

  static defaultProps = {
    bsStyle: 'info',
    children: undefined,
    className: '',
    collapsible: false,
    header: undefined,
    title: '',
  };

  render() {
    const { bsStyle, children, className, collapsible, header, title } = this.props;
    const defaultHeader = (<h3><i className="fa fa-info-circle" />&emsp;{title}</h3>);

    return (
      <Panel bsStyle={bsStyle}
             className={`${styles.helpPanel} ${className}`}
             collapsible={collapsible}
             header={header || defaultHeader}>
        {children}
      </Panel>
    );
  }
}

export default HelpPanel;

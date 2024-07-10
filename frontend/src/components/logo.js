import React from 'react';
import PropTypes from 'prop-types';
import { siteRoot, mediaUrl, logoPath, logoWidth, logoHeight, siteTitle } from '../utils/constants';
import { Utils } from '../utils/utils';

const propTypes = {
  onCloseSidePanel: PropTypes.func,
  showCloseSidePanelIcon: PropTypes.bool,
  positioned: PropTypes.bool,
  showLogoOnlyInMobile: PropTypes.bool
};

class Logo extends React.Component {

  closeSide = () => {
    this.props.onCloseSidePanel();
  };

  render() {
    const { positioned, showLogoOnlyInMobile } = this.props;

    if (showLogoOnlyInMobile && Utils.isDesktop()) {
      return null;
    }

    return (
      <div className={`top-logo ${positioned ? 'd-none d-md-block positioned-top-logo' : ''}`}>
        <a href={siteRoot} id="logo">
          <img src={logoPath.indexOf('image-view') != -1 ? logoPath : mediaUrl + logoPath} height={logoHeight} width={logoWidth} title={siteTitle} alt="logo" />
        </a>
        {this.props.showCloseSidePanelIcon &&
          <a
            className="sf2-icon-x1 sf-popover-close side-panel-close action-icon d-md-none"
            onClick={this.closeSide}
            title="Close"
            aria-label="Close"
          >
          </a>
        }
      </div>
    );
  }
}

Logo.propTypes = propTypes;

export default Logo;

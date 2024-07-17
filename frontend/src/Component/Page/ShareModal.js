import React, { useState } from 'react';
import { Popover } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Add brand icons to the library
library.add(faFacebook, faTwitter, faWhatsapp);
function ShareModal() {
  const [showPopover, setShowPopover] = useState(true);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (<>
    <div style={{ marginTop: '-30px', marginLeft: '0px' }}>
      <i class="fa fa-share-alt circle-border" style={{
        marginLeft: '-60px',
        position: 'absolute'
      }} onClick={togglePopover} aria-hidden="true"></i>
      <Popover show={showPopover} style={{ marginLeft: '-50px', top: '12px' }} onClose={() => setShowPopover(false)} placement="bottom">
        <Popover.Header as="h3">Share link</Popover.Header>
        <Popover.Body>
          {/* Facebook share button */}
          <div className="icon-share-fb">
            <FacebookShareButton url={`https://www.facebook.com/login.php`} quote={`facebook`}>
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </FacebookShareButton>
          </div>

          {/* Twitter share button */}
          <div className="icon-share-tw">
            <TwitterShareButton url={`https://twitter.com/i/flow/login`} title={`twitter`}>
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </TwitterShareButton>
          </div>

          {/* WhatsApp share button */}
          <div className="icon-share-wa">
            <WhatsappShareButton url={window.location.href} title={`whatsapp`}>
              <i class="fa fa-whatsapp" aria-hidden="true"></i>
            </WhatsappShareButton>
          </div>
        </Popover.Body>
      </Popover>
    </div ></>

  );
}

export default ShareModal;

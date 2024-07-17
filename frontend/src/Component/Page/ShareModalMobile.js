import React, { useEffect, useState } from 'react';
import { Popover } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useParams } from 'react-router-dom';

const ShareModalMobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const _id = useParams();
  const [productdetail, setproductdetail] = useState();
  const [selectedWeight, setSelectedWeight] = useState();
  const getDetails = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllproductbyid/${_id?.id}`
    );
    const result = await resource.json();
    setproductdetail()
    setproductdetail(result?.product);
    const weightWishPrice = JSON.parse(result?.product?.weightwishprice);
    setSelectedWeight(weightWishPrice)
  }
  useEffect(() => {
    getDetails()
  }, [])

  return (
    <div className="app">
      <div className="share-icon-mob">
        <i class="fa fa-share-alt share-circle-border" onClick={toggleModal} aria-hidden="true"></i>
        {/* <button onClick={toggleModal}>Open Modal</button> */}
        {isModalOpen && (
          <div className="modal-layer">
            <div className="modal-container">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Share This Product</h3>
                  <i class="fa fa-times-circle-o" onClick={toggleModal} aria-hidden="true"></i>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <h3>{productdetail?.name}</h3>
                    </div>
                    <div className="col-12">
                      <div className="modal-share-icons">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareModalMobile;

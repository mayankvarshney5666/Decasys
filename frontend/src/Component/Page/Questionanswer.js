import React from 'react'
import { Link } from 'react-router-dom'

export default function Questionanswer() {
  return (
    <div className='container' style={{ marginBottom: '100px', marginTop: '50px' }}>
      <div className="row" id="questionAnswer">
        <div className="col-12">
          <div className="product-section-box">
            <div className="tab-content custom-tab">
              <div className="">
                <div className="review-box">
                  <div className="row g-4">

                    <div className="col-12">
                      <div className="review-title">
                        <h4 className="fw-500" style={{ fontSize: "22px", fontWeight: "700" }}>Questions and Answers</h4>
                      </div>
                      <div className="review-sub-title">
                        <p>Answers posted solely reflect the views and opinions expressed by the contributors and not those of Decasys. Decasys does not verify or endorse such answers or claims. Statements regarding dietary supplements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease or health condition.</p>
                      </div>
                      <div className="qa-search-wrapper">
                        <div className="col-xl-12">
                          <div className="row g-4">
                            <div className="col-6 col-lg-6">
                              <div className="form-floating theme-form-floating">
                                <div className="search-box">
                                  <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" aria-label="Example text with button addon" />
                                    {/* <button class="btn" type="button" id="button-addon2">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                                  </button> */}
                                    <button className="btn theme-bg-color-wh m-0" type="button" id="button-addon1">
                                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                                    </button>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div className="col-6 col-lg-3">
                              <div className="form-floating theme-form-floating">
                                <select name="test_star" class="form-control select_reating">
                                  <option value="" class="ggrtext">All</option>
                                  <option value="1" class="greenText">Specifications</option>
                                  <option value="2" class="greenText">Brand</option>
                                  <option value="3" class="greenText">Ingredients</option>
                                  <option value="4" class="greenText">Usage</option>
                                  <option value="5" class="greenText">Shipping</option>
                                  <option value="5" class="greenText">Other</option>
                                </select>
                                <label htmlFor="review1">Category</label>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-floating theme-form-floating">
                                <button type="button" name="" id="" class="btn btn-ask" data-toggle="modal" data-target="#ModalAskQuestion">Ask a question</button>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review-people">
                        <ul className="review-list">
                          <li>
                            <div className="people-box-outer-wrapper">
                              <div className="row">
                                <div className="col-12 col-lg-10">
                                  <p className='Question'>So salt that came I can't use in the grinder , cause the texture is kinda wet. Has anyone had a problem like that? I was thinking maybe i could dry it somehow</p>
                                </div>
                                <div className="col-12 col-lg-2">
                                  <div className="product-rating">
                                    <button type="button" class="btn theme-bg-bordered btn-sm">Answer</button>
                                  </div>
                                </div>
                              </div>
                              <div className="people-box">
                                <div className="people-comment">

                                  <div className="row">
                                    <div className="col-8">
                                      <a className="name" href="javascript:void(0)">
                                        <img src="https://www.decasys.in/images/images.png" style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                                        Decasys Customer
                                      </a>
                                    </div>
                                    <div className="col-4">
                                      <div className="product-rating pull-right">
                                        <p>Share <i class="fa fa-share-alt circle-border"></i></p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="date-time">
                                    <h6 className="text-content">17 April 2024</h6>
                                  </div>

                                  <div className="verified-purchase">
                                    <div className="verified-purchase-list">
                                      <ul class="purchase-list">
                                        <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Verified Purchase</li> |
                                        <li><i class="fa fa-star-o" aria-hidden="true"></i> Best Answer</li> |
                                        <li><i class="fa fa-flag-o" aria-hidden="true"></i> Rewarded Answer</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="reply">
                                    <p>I doubt you can effectively dry this. Better use it wet and get another much dryer salt. This one will not work in a grinder. Please click the like button and thank you for doing so</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="See-more-answers">
                                    <a className="name" href="javascript:void(0)">
                                      See more answers (10) <i class="fa-solid fa-chevron-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="people-box-outer-wrapper">
                              <div className="row">
                                <div className="col-12 col-lg-10">
                                  <p className='Question'>So salt that came I can't use in the grinder , cause the texture is kinda wet. Has anyone had a problem like that? I was thinking maybe i could dry it somehow</p>
                                </div>
                                <div className="col-12 col-lg-2">
                                  <div className="product-rating">
                                    <button type="button" class="btn theme-bg-bordered btn-sm">Answer</button>
                                  </div>
                                </div>
                              </div>
                              <div className="people-box">
                                <div className="people-comment">

                                  <div className="row">
                                    <div className="col-8">
                                      <a className="name" href="javascript:void(0)">
                                        <img src="https://www.decasys.in/images/images.png" style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                                        Decasys Customer
                                      </a>
                                    </div>
                                    <div className="col-4">
                                      <div className="product-rating pull-right">
                                        <p>Share <i class="fa fa-share-alt circle-border"></i></p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="date-time">
                                    <h6 className="text-content">17 April 2024</h6>
                                  </div>

                                  <div className="verified-purchase">
                                    <div className="verified-purchase-list">
                                      <ul class="purchase-list">
                                        <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Verified Purchase</li> |
                                        <li><i class="fa fa-star-o" aria-hidden="true"></i> Best Answer</li> |
                                        <li><i class="fa fa-flag-o" aria-hidden="true"></i> Rewarded Answer</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="reply">
                                    <p>I doubt you can effectively dry this. Better use it wet and get another much dryer salt. This one will not work in a grinder. Please click the like button and thank you for doing so</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="See-more-answers">
                                    <a className="name" href="javascript:void(0)">
                                      See more answers (5) <i class="fa-solid fa-chevron-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="people-box-outer-wrapper">
                              <div className="row">
                                <div className="col-12 col-lg-10">
                                  <p className='Question'>So salt that came I can't use in the grinder , cause the texture is kinda wet. Has anyone had a problem like that? I was thinking maybe i could dry it somehow</p>
                                </div>
                                <div className="col-12 col-lg-2">
                                  <div className="product-rating">
                                    <button type="button" class="btn theme-bg-bordered btn-sm">Answer</button>
                                  </div>
                                </div>
                              </div>
                              <div className="people-box">
                                <div className="people-comment">

                                  <div className="row">
                                    <div className="col-8">
                                      <a className="name" href="javascript:void(0)">
                                        <img src="https://www.decasys.in/images/images.png" style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                                        Decasys Customer
                                      </a>
                                    </div>
                                    <div className="col-4">
                                      <div className="product-rating pull-right">
                                        <p>Share <i class="fa fa-share-alt circle-border"></i></p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="date-time">
                                    <h6 className="text-content">17 April 2024</h6>
                                  </div>

                                  <div className="verified-purchase">
                                    <div className="verified-purchase-list">
                                      <ul class="purchase-list">
                                        <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Verified Purchase</li> |
                                        <li><i class="fa fa-star-o" aria-hidden="true"></i> Best Answer</li> |
                                        <li><i class="fa fa-flag-o" aria-hidden="true"></i> Rewarded Answer</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="reply">
                                    <p>I doubt you can effectively dry this. Better use it wet and get another much dryer salt. This one will not work in a grinder. Please click the like button and thank you for doing so</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="See-more-answers">
                                    <a className="name" href="javascript:void(0)">
                                      See more answers (15) <i class="fa-solid fa-chevron-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="people-box-outer-wrapper">
                              <div className="row">
                                <div className="col-12 col-lg-10">
                                  <p className='Question'>So salt that came I can't use in the grinder , cause the texture is kinda wet. Has anyone had a problem like that? I was thinking maybe i could dry it somehow</p>
                                </div>
                                <div className="col-12 col-lg-2">
                                  <div className="product-rating">
                                    <button type="button" class="btn theme-bg-bordered btn-sm">Answer</button>
                                  </div>
                                </div>
                              </div>
                              <div className="people-box">
                                <div className="people-comment">

                                  <div className="row">
                                    <div className="col-8">
                                      <a className="name" href="javascript:void(0)">
                                        <img src="https://www.decasys.in/images/images.png" style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                                        Decasys Customer
                                      </a>
                                    </div>
                                    <div className="col-4">
                                      <div className="product-rating pull-right">
                                        <p>Share <i class="fa fa-share-alt circle-border"></i></p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="date-time">
                                    <h6 className="text-content">17 April 2024</h6>
                                  </div>

                                  <div className="verified-purchase">
                                    <div className="verified-purchase-list">
                                      <ul class="purchase-list">
                                        <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Verified Purchase</li> |
                                        <li><i class="fa fa-star-o" aria-hidden="true"></i> Best Answer</li> |
                                        <li><i class="fa fa-flag-o" aria-hidden="true"></i> Rewarded Answer</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="reply">
                                    <p>I doubt you can effectively dry this. Better use it wet and get another much dryer salt. This one will not work in a grinder. Please click the like button and thank you for doing so</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="See-more-answers">
                                    <a className="name" href="javascript:void(0)">
                                      See more answers (25) <i class="fa-solid fa-chevron-right"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="row" style={{ textAlign: "center", marginTop: "20px", }}>
                    <div className="col-12">
                      <div className="See-more-answers">
                        <Link className="name" to={`/questionanswer/${_id?.id}`}>
                          See All 25 Q&A <i class="fa-solid fa-chevron-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
  )
}

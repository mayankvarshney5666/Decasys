import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReletedProduct from './ReletedProduct';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Parser from 'html-react-parser';
import { addCart, addWishlist } from '../../features/cartSlice';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import ReactImageMagnify from 'react-image-magnify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import Rating from './Rating';
// import './SliderComponent.css';
import ShareModal from './ShareModal';
import ShareModalMobile from './ShareModalMobile';
import Modal from 'react-modal';



export default function ProductDetails() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;

  const _id = useParams();
  const [productdetail, setproductdetail] = useState();
  const [selectedWeight, setSelectedWeight] = useState();
  const [visibleReviews, setVisibleReviews] = useState(5);
  const handleLoadMore = () => {
    setVisibleReviews(showreview.length);
  };
  const getDetails = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllproductbyid/${_id?.id}`
    );
    const result = await resource.json();
    setproductdetail()
    setproductdetail(result?.product);
    const weightWishPrice = JSON.parse(result?.product?.weightwishprice);
    // setSelectedWeight()
    setSelectedWeight(weightWishPrice)
    // setnewset()
    setnewset(weightWishPrice[0])
  }

  useEffect(() => {
    getDetails()
  }, [])
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(selectedWeight)
  useEffect(() => {
    // Set the first thumbnail as active when the component mounts
    handleThumbnailClick(0);
  }, []); // Empty dependency array to run this effect only once on mount

  const handleThumbnailClick = (index) => {

    setActiveIndex(index);
    // Remove the 'active' class from all thumbnails
    const thumbnails = document.querySelectorAll('.slick-bottom-image');
    thumbnails.forEach(thumbnail => {
      thumbnail.classList.remove('active');
    });

    // Add the 'active' class to the clicked thumbnail
    const clickedThumbnail = document.querySelector(`#thumbnail-${index}`);
    if (clickedThumbnail) {
      clickedThumbnail.classList.add('active');
    }

    // Update the main image
    const mainImage = document.getElementById('mainImage');
    mainImage.src = `${imgUrl}/${productdetail?.images[index]?.image_name}`;

    mainImage.setAttribute('data-zoom-image', `${imgUrl}/${productdetail?.images[index]?.image_name}`);
  };

  const [newset, setnewset] = useState([]);
  const handleWeightClick = (weight) => {
    console.log(weight)
    // setSelectedWeight(weight);
    setnewset(weight)
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addtocart = async (id) => {
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const currentTime = Math.floor(Date.now() / 1000);
    const Session_id = await localStorage.getItem('session_id');
    if (!Session_id) {
      const genrateId = randomNum + 'cqoetb' + currentTime;
      await localStorage.setItem('session_id', genrateId);
    }
    const user_id = localStorage.getItem('user_id');
    const data = {
      productid: productdetail?._id,
      Quantity: updatequantity,
      user_id: localStorage.getItem('user_id'),
      productimg: productdetail?.images[0]?.image_name,
      productWeight: JSON.parse(productdetail?.weightwishprice[0])[0].weight,
      productPrice: JSON.parse(productdetail?.weightwishprice[0])[0].price,
      session_id: localStorage.getItem('session_id'),
      productname: productdetail?.name,
    };

    //login must before Add to cart 
    if (!user_id) {
      await navigate('/signin');
      toast.success('Plz Login First Add to Cart');
    } else {
      const aaaa = await dispatch(addCart(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
    }



  }

  const addtowishlist = async (id) => {
    const data = {
      productid: productdetail?._id,
      Quantity: 1,
      user_id: localStorage.getItem('user_id'),
      productimg: productdetail?.images[0]?.image_name,
      productWeight: JSON.parse(productdetail?.weightwishprice[0])[0].weight,
      productPrice: JSON.parse(productdetail?.weightwishprice[0])[0].price,
      session_id: localStorage.getItem('session_id'),
      productname: productdetail?.name,
    };
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      await navigate('/signin');
      toast.success('Plz Login First Add to Wishlist');
    } else {
      const aaaa = await dispatch(addWishlist(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
    }
  }

  const smallImages = productdetail?.images ? productdetail.images.map((image, index) => {
    return `${imgUrl}/${image?.image_name}`;
  }) : [];

  const [activeSmallImage, setActiveSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [activeIndex1, setActiveIndex1] = useState(0);
  // const handleSmallImageClick = async(imageUrl,index) => {
  //   setLargeImage(imageUrl);
  //   setActiveSmallImage(imageUrl);
  //   const index = smallImages.indexOf(imageUrl);
  //   setActiveIndex1(index);
  //   // setActiveIndex(index);
  //   sliderRef.current.slickGoTo(index);
  // }; 

  const sliderRef = useRef(null);



  const handleSmallImageClick = async (imageUrl, index) => {
    setLargeImage(imageUrl);
    setActiveSmallImage(imageUrl);
    setActiveIndex1(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    } else {
      console.warn('Slider ref not yet available. Skipping slickGoTo');
    }
  };

  useEffect(() => {
    if (productdetail && productdetail.images && productdetail.images.length > 0) {
      setActiveSmallImage(`${imgUrl}/${productdetail.images[0]?.image_name}`);
      setLargeImage(`${imgUrl}/${productdetail.images[0]?.image_name}`);
    }
  }, [productdetail]);

  const handleLeftArrowClick = () => {
    const newIndex = (activeIndex1 - 1 + smallImages.length) % smallImages.length;
    setActiveIndex1(newIndex);
    setLargeImage(smallImages[newIndex]);
    setActiveSmallImage(smallImages[newIndex]);
  };

  const handleRightArrowClick = () => {
    const newIndex = (activeIndex1 + 1) % smallImages.length;
    setActiveIndex1(newIndex);
    setLargeImage(smallImages[newIndex]);
    setActiveSmallImage(smallImages[newIndex]);
  };
  const [review, setreview] = useState([]);
  const [showreview, setshowreview] = useState([]);
  const [showreview1, setShowReview1] = useState(/* initial value */);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${apiUrl}/getAllReviews/${_id?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();

        setshowreview(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [_id?.id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    const file = e.target.files[0];
    setreview({ ...review, image: file });
  };


  const AddReview = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', review?.title);
    formData.append('comment', review?.comment);
    formData.append('name', review?.name);
    formData.append('rating', review?.rating);
    formData.append('image0', review?.image);
    formData.append('product_id', _id?.id);
    const response = await fetch(
      `${apiUrl}/AddRevied`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.success === true) {
      toast.success(result.message);
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 500);
    } else {
      // Handle error condition
      toast.error('Failed to add review');
    }
  }


  const settings = {
    // autoplay: true,
    dots: true,
    appendDots: dots => (
      <ul style={{ margin: "0", padding: "0", textAlign: "center" }}>
        <div>{dots}</div>

      </ul>
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [setheight, heifgtset] = useState('86%');
  const [setweidth, setweidtht] = useState('90%');
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    const container = document.querySelector('.image-container');
    const element = document.querySelector('.cccccc');
    const element1 = document.querySelector('.formobileimg');
    const element2 = document.querySelector('.zoomImgss');

    if (element) {
      if (isZoomed) {
        heifgtset('86%');
        setweidtht('90%');
        container.style.cursor = 'zoom-in';
        element.style.width = '';
        element.style.height = 'auto';
        element1.style.width = '173px';
        element1.style.height = '263px';
        element1.style.marginTop = '25px';
        element1.style.marginLeft = '57px';
        element2.style.width = '';
        element2.style.height = ''
      } else {
        heifgtset('500%')
        setweidtht('150%')
        // element.style.paddingTop = '20px';
        element.style.height = '440px';
        container.style.cursor = 'zoom-out';
        element.style.width = '600px';
        element1.style.width = '382px';
        element1.style.height = '320px';
        element1.style.marginTop = '24px';
        element1.style.marginLeft = '-68px';
        // element2.style.width='108%';
        // element2.style.height='150%';
      }
    }
  };

  const handleMouseMove122 = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    const { left, top, bottom, width, height } = e.target.getBoundingClientRect();

    // Calculate the distance from the top and bottom
    const distanceFromTop = e.clientY - top;
    const distanceFromBottom = bottom - e.clientY;
    console.log('distanceFromTop', distanceFromTop)
    console.log('distanceFromBottom', distanceFromBottom)
    // Adjust the scale factor based on the distance from top and bottom
    const scaleFactorY = (distanceFromTop < distanceFromBottom ? 0.2 : 1.6); // Adjust as needed

    // Adjust the scale factor to limit the zoomed area
    const scaleFactorX = 1.4; // 140% of the width

    let y;
    if (scaleFactorY === 0.2) {
      y = ((e.clientY - bottom) / height) * scaleFactorY;
    } else {
      y = ((e.clientY - top) / height) * scaleFactorY;
    }

    const x = ((e.clientX - left) / width) * scaleFactorX;

    e.target.style.transformOrigin = `${x * 100}% ${y * 100}%`; // Convert x and y to percentage
  };

  const checkmousemoveheight = (e) => {
    if (!e.target) return; // Check if e.target is null
    setCursorPosition({ x: e.clientX, y: e.clientY });
    const { top, bottom } = e.target.getBoundingClientRect();

    // Calculate the distance from the top and bottom
    const distanceFromTop = e.clientY - top;
    const distanceFromBottom = bottom - e.clientY;
    handleMouseMove(e);
    if (distanceFromTop > distanceFromBottom) {
      handleMouseMove(e); // Pass the event to handleMouseMove
    } else {
      handleMouseMoves(e); // Pass the event to handleMouseMoves
    }
  };

  const handleMouseMoves = (e) => {
    if (!e.target) return; // Check if e.target is null
    setCursorPosition({ x: e.clientX, y: e.clientY });
    const { left, bottom, width, height } = e.target.getBoundingClientRect();
    const scaleFactorX = 1.4;
    const scaleFactorY = 0.3;
    const x = ((e.clientX - left) / width) * scaleFactorX;
    const y = ((e.clientY - bottom) / height) * scaleFactorY;
    e.target.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  const handleMouseMove = (e) => {
    if (!e.target) return; // Check if e.target is null
    setCursorPosition({ x: e.clientX, y: e.clientY });
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const scaleFactorX = 1.4;
    const scaleFactorY = 1.6;
    const x = ((e.clientX - left) / width) * scaleFactorX;
    const y = ((e.clientY - top) / height) * scaleFactorY;
    e.target.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  const TouchEventHandler = (e) => {
    // e.preventDefault(); // Prevent default touch behavior

    if (!isZoomed) {
      const touch = e.touches[0];
      if (touch) {
        const { left, top, width, height, bottom } = e.currentTarget.getBoundingClientRect();
        const x = ((touch.clientX - left) / width) * 100;
        const y = ((touch.clientY - top) / height) * 100;
        e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
      }
    } else {
      const touch = e.touches[0];

      if (touch) {
        const { left, top, width, height, bottom } = e.currentTarget.getBoundingClientRect();
        // alert(top)
        const x = ((touch.clientX - left) / width) * 100;
        const y = ((touch.clientY - top) / height) * 100;
        e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
      }
    }
  };

  const scrollToReview = async () => {

    // Change class name of tab-pane fade to tab-pane fade active show
    const tabPaneElement = document.getElementById('reviewwwww');
    const tabPaneElement2 = document.getElementById('info');
    const tabPaneElement12 = document.getElementById('description');

    const tabPaneElement22222 = document.getElementById('description-tab');
    const tabPaneElement2333333 = document.getElementById('info-tab');
    const tabPaneElement1244444 = document.getElementById('review-tab');
    if (tabPaneElement) {
      tabPaneElement.classList.add('active', 'show');
      tabPaneElement2.classList.remove('active', 'show');
      tabPaneElement12.classList.remove('active', 'show');
      tabPaneElement1244444.classList.add('active', 'show');
      tabPaneElement22222.classList.remove('active', 'show');
      tabPaneElement2333333.classList.remove('active', 'show');
    }
    const reviewElement = await document.getElementById('reviewwwww');
    if (reviewElement) {
      reviewElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReviewmobile = async () => {
    const reviewElement = await document.getElementById('collapseFour');
    const reviewElementcollapseFive = await document.getElementById('collapseFive');
    const reviewElementcollapseThree = await document.getElementById('collapseThree');
    const reviewElementcollapseOne = await document.getElementById('collapseOne');

    reviewElement.classList.add('active', 'show');
    reviewElementcollapseFive.classList.remove('active', 'show');
    reviewElementcollapseThree.classList.remove('active', 'show');
    reviewElementcollapseOne.classList.remove('active', 'show');

    if (reviewElement) {
      reviewElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const scrollToReview1 = async () => {
    const reviewElement = await document.getElementById('questionAnswer1');
    if (reviewElement) {
      reviewElement.scrollIntoView({ behavior: 'smooth' });
    }


  }

  const scrollToquestionformobile = async () => {
    const reviewElement = await document.getElementById('collapseFive');

    const reviewElementcollapseFive = await document.getElementById('collapseFour');
    const reviewElementcollapseThree = await document.getElementById('collapseThree');
    const reviewElementcollapseOne = await document.getElementById('collapseOne');

    reviewElement.classList.add('active', 'show');
    reviewElementcollapseFive.classList.remove('active', 'show');
    reviewElementcollapseThree.classList.remove('active', 'show');
    reviewElementcollapseOne.classList.remove('active', 'show');

    if (reviewElement) {
      reviewElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


  const handleMouseLeave = () => {
    setIsZoomed(false);
    setIsHovered(false)
    // heifgtset('86%')

    heifgtset('86%');
    setweidtht('90%');
    const container = document.querySelector('.image-container');
    container.style.cursor = 'zoom-in';
    const element = document.querySelector('.cccccc');
    element.style.width = '';
    element.style.height = 'auto';
  };
  const [updatequantity, setupdatequantity] = useState(1);
  const Iecrement = (e) => {
    if (updatequantity == 2) {
      return alert('Max 2 Quantity');
    }
    setupdatequantity(updatequantity + 1);
  }
  const Decrement = (e) => {
    if (updatequantity == 1) {
      alert('Min 1 Quantity Required');
    } else {
      setupdatequantity(updatequantity - 1);
    }
  }

  const handleShare = async () => {
    // Replace 'url-to-share' with the actual URL of your product detail page
    const productUrl = encodeURIComponent('https://www.decasys.in/ProductDetails/65f40eb7929c030cd576f92e');
    // Replace 'product-title' with the title of your product
    const productTitle = encodeURIComponent('Product Title');
    // URL for Facebook sharing
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + productUrl;
    // URL for Twitter sharing
    const twitterUrl = 'https://twitter.com/intent/tweet?url=' + productUrl + '&text=' + productTitle;
    // URL for Pinterest sharing
    const pinterestUrl = 'https://pinterest.com/pin/create/button/?url=' + productUrl + '&description=' + productTitle;
    // Open a new window for each social media platform
    window.open(facebookUrl, '_blank');
    window.open(twitterUrl, '_blank');
    window.open(pinterestUrl, '_blank');
  };

  const uniqueImages = Array.from(new Set(smallImages));

  const settings2 = {
    infinite: 1,
    // slidesToShow: 6, // Default slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint according to your design
        settings: {
          slidesToShow: uniqueImages?.length, // Change slides to show for mobile view
        },
      },
    ],
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [modeltitle, setmodeltitle] = useState(null);
  const [modelstar, setmodelstar] = useState(null);
  const [modeldate, setmodeldate] = useState(null);
  const [modelname, setmodelname] = useState(null);
  const openModal = (image, name, title, comment, star, date) => {

    setmodeltitle(title)
    setSelectedImage(image);
    setmodelstar(star);
    setmodeldate(date)
    setModalIsOpen(true);
    setSelectedComment(comment);
    setmodelname(name)
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
    setSelectedComment(null);
    setmodeldate(null);
    setmodelstar(null);
    setmodelname(null)
    setmodeltitle(null);
  };

  const customStyles1 = {
    content: {
      width: '50%',
      height: 'auto',
      maxHeight: '60vh',
      margin: '50px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };
  const sanitizeDescription = (description) => {
    // Replace "Powered by Froala Editor" with an empty string
    const cleanDescription = description.replace(/Powered by/g, '');
    const cleanDescription1 = cleanDescription.replace(/Froala Editor/g, '');
    return cleanDescription1;
  };
  // const description = productdetail?.description ? sanitizeDescription(productdetail.description) : '';

  return (
    <div>
      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Product Detail</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Product Left Sidebar Start */}
      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="row">

            <div class="col-xxl-9 col-xl-8 col-lg-7">
              <div className="row g-4">

                <div className="col-xl-6">
                  <div className="product-left-box">
                    <div className="row g-2">

                      <div className="col-12 d-lg-none d-xs-block">
                        <div className="share-icon-mob-outer">
                          <Link to={`/categorylist`}>Celtic Sea Salt</Link>
                          <ShareModalMobile></ShareModalMobile>

                        </div>
                      </div>
                      <div className="col-12 d-lg-none d-xs-block">
                        <h3 className="name mt-1">{productdetail?.name}</h3>
                      </div>
                      <div className="col-12 d-lg-none d-xs-block" style={{ display: "inline-flex" }}>
                        <Link onClick={scrollToReviewmobile}>
                          <div class="product-rating custom-rate" style={{ marginTop: '10px' }}>
                            {
                              Number.isInteger(productdetail?.averageRating) ? (
                                <>({productdetail?.averageRating}.0)</>
                              ) : (
                                <>({productdetail?.averageRating})</>
                              )
                            }


                            &nbsp;<Rating rating={productdetail?.averageRating} />&nbsp;
                            <span class="review">({productdetail?.totalReviews} Customer Reviews)</span>
                          </div>
                        </Link>

                        <div class="product-rating custom-rate" style={{ marginTop: '10px', marginLeft: '10px' }}>|</div>
                        <Link onClick={scrollToquestionformobile}><div class="product-rating custom-rate" style={{ marginTop: '12px', marginLeft: '5px' }}>
                          <span class="review" style={{ color: '#1976d2', marginLeft: '10px' }}><i class="fa-solid fa-clipboard-question"></i> 10 Q&A</span>
                        </div></Link>
                      </div>
                      {/* for Mobile view */}

                      <Slider  {...settings} className="setformobile d-lg-none d-xs-block">
                        {productdetail?.images.map((img, index) => (
                          <div className="col-12 d-lg-none d-xs-block">
                            <div className="product-main-1 no-arrow">
                              <div>
                                <a
                                  href="javascript:void(0)"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view1567576333"
                                >
                                  <div className="slider-image d-flex position-relative">
                                    <img style={{
                                      width: '350px',
                                      height: '350px',
                                      objectFit: 'contain',
                                    }}
                                      src={`${imgUrl}/${img.image_name}`}
                                      className="img-fluid image_zoom_cls-0 blur-up lazyload responsive-image"
                                      alt=""
                                      width="100%"
                                      height="auto"
                                    />
                                  </div>

                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                      {/* for Mobile view */}

                      {/* for desktop view */}
                      <div className="col-12 sm-none">
                        <div className="product-main-1 no-arrow">
                          <div>
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#view1567576"
                            >
                              <div className="slider-image d-flex position-relative">
                                <img style={{
                                  width: '350px',
                                  height: '350px',
                                  objectFit: 'contain',
                                }}
                                  src={`${imgUrl}/${productdetail?.images[0]?.image_name}`}
                                  id="mainImage"
                                  data-zoom-image={`${imgUrl}/${productdetail?.images[0]?.image_name}`}
                                  className="img-fluid image_zoom_cls-0 blur-up lazyload responsive-image" // Add the 'responsive-image' class
                                  alt=""
                                  width="100%" // Set the width to fill the container
                                  height="auto" // Maintain the aspect ratio
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 sm-none">
                        <div className="bottom-slider-image left-slider no-arrow slick-top">
                          {productdetail?.images.map((img, index) => (
                            <div key={index} id={`thumbnail-${index}`} onClick={() => handleThumbnailClick(index)}>
                              <div className={`slick-bottom-image d-flex justify-content-center align-items-center position-relative ${index === activeIndex ? 'active' : ''}`}>
                                <img style={{ maxWidth: '50%' }}
                                  src={`${imgUrl}/${img.image_name}`}
                                  className="img-fluid responsive-image " // Add the 'responsive-image' class
                                  alt=""
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* for desktop view */}
                    </div>

                  </div>
                </div>


                <div class="col-xl-6">
                  <div className="right-box-contain">

                    <div className="row sm-none">
                      <div class="col-12">
                        <ShareModal></ShareModal>
                        <Link to={`/brand/65e06a4b299335f107e67b14`}>Celtic Sea Salt</Link>
                        <h3 className="name mt-1">{productdetail?.name}</h3>
                      </div>
                    </div>

                    <div className="row sm-none">
                      <div class="col-12" style={{ display: "inline-flex" }}>
                        <Link onClick={scrollToReview} >
                          <div class="product-rating custom-rate"
                            style={{ marginTop: '10px', fontSize: 12 }}>
                            {
                              Number.isInteger(productdetail?.averageRating) ? (
                                <>({productdetail?.averageRating}.0)</>
                              ) : (
                                <>({productdetail?.averageRating})</>
                              )
                            }

                            &nbsp;<Rating rating={productdetail?.averageRating} />&nbsp;
                            <span class="review" style={{ color: '#76c603' }}>({productdetail?.totalReviews} Customer Reviews)</span>
                          </div>
                        </Link>
                        <div class="product-rating custom-rate" style={{ marginTop: '10px', marginLeft: '10px' }}>|</div>
                        <Link onClick={scrollToReview1}><div class="product-rating custom-rate" style={{ marginTop: '12px', marginLeft: '5px' }}>
                          <span class="review" style={{ color: '#1976d2', marginLeft: '10px' }}><i class="fa-solid fa-clipboard-question"></i> 10 Q&A</span>
                        </div></Link>
                      </div>
                    </div>

                    <div className="row sm-none">
                      <div class="col-12">
                        <div class="buy-box">
                          <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {productdetail?.Stock > 0 ? (
                              <span>In Stock </span>
                            ) : (
                              <span>Out Of Stock </span>)}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row sm-none">
                      <div class="col-12">
                        <div class="buy-box">
                          <span>Inclusive of all taxes</span>
                        </div>
                      </div>
                    </div>

                    <div className="row d-lg-none">
                      <div class="col-12">
                        <div class="buy-box">
                          <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            {productdetail?.Stock > 0 ? (
                              <span>In Stock </span>
                            ) : (
                              <span>Out Of Stock </span>)}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="row d-lg-none">
                      <div class="col-12">
                        <div class="buy-box">
                          <span>Inclusive of all taxes</span>
                        </div>
                      </div>
                    </div>

                    <div className="row d-lg-none">
                      <div class="col-xxl-3 col-xl-4 col-lg-5">
                        <div class="right-sidebar-box">
                          <div class="vendor-box vendor-box-mob">

                            <div className="row">
                              <div class="col-lg-12">
                                <div class="price-rating">
                                  <h3 class="theme-color price">Our Price &nbsp;
                                    ₹ {newset?.price}.0 <del class="text-content">₹ {parseInt(newset?.price) + parseInt(newset?.discountPrice)}</del>&nbsp;
                                    <span class="offer theme-color" style={{ fontSize: '12px' }}>(Save ₹ {newset?.discountPrice})</span></h3>
                                </div>
                              </div>
                              <div className="py-2">
                                <div className="row">
                                  <div className="col-8">

                                  </div>
                                  <div className="col-4">
                                    <div className="quantityes">
                                      <button onClick={Decrement} className="decrementes">-</button>
                                      <input type="text" className="value incrementss" value={updatequantity} />
                                      <button onClick={Iecrement} className="incrementes">+</button>
                                    </div>   </div>
                                </div>
                              </div>
                              <div class="col-lg-12" style={{ width: '100%' }}>
                                <div class="vendor-list">
                                  <div className="note-box product-packege">
                                    {productdetail?.Stock > 0 ? (
                                      <button type='button' className="btn theme-bg-color proceed-btn btn-md w-100 mt-1 fw-bold"
                                        style={{ color: '#fff' }}
                                        onClick={() => addtocart(productdetail?._id)}
                                      >Add to Cart
                                      </button>
                                    ) : (<button type='button' className="btn theme-bg-color proceed-btn btn-md w-100 mt-1 fw-bold"
                                      style={{ color: '#fff' }}

                                    >Out Of Stock
                                    </button>)}
                                  </div>

                                  <div class="col-lg-12">
                                    <div class="vendor-list">
                                      <div className="note-box product-packege">
                                        <h6>The price includes *GST and Free shipping on all orders till 31st of July.</h6>
                                      </div>

                                    </div>
                                  </div>
                                  <div className="buy-box">
                                    <button type='button' className="btn btn-animation text-white btn-md w-100 mt-1 fw-bold"
                                      onClick={() => addtowishlist(productdetail?._id)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M4 9.09319C4.00302 11.7065 5.60462 14.1966 7.55728 16.0983C8.5206 17.0364 9.53084 17.7924 10.3881 18.3076C10.8172 18.5655 11.1945 18.755 11.4971 18.8768C11.6481 18.9376 11.7707 18.9776 11.8647 19.0014C11.9518 19.0235 11.994 19.0266 11.9997 19.027C12.0004 19.027 12.0005 19.027 12 19.027C11.9994 19.027 11.9996 19.027 12.0003 19.027C12.006 19.0266 12.0482 19.0235 12.1353 19.0014C12.2292 18.9776 12.3519 18.9376 12.5029 18.8768C12.8055 18.755 13.1828 18.5655 13.6118 18.3076C14.4691 17.7924 15.4794 17.0364 16.4427 16.0982C18.3954 14.1966 19.997 11.7065 20 9.09322C19.9719 7.40202 18.9862 5.83837 17.6856 5.24052C17.057 4.95158 16.3321 4.873 15.5348 5.12266C14.724 5.37653 13.7744 5.99163 12.7751 7.20112C12.5852 7.43098 12.3006 7.56438 12 7.56438C11.6994 7.56438 11.4147 7.43098 11.2248 7.20112C10.2256 5.99163 9.27597 5.37653 8.46521 5.12266C7.66791 4.873 6.94295 4.95158 6.31438 5.24052C5.01383 5.83836 4.02807 7.402 4 9.09319ZM12 5.10389C11.0549 4.16913 10.0687 3.55481 9.0703 3.24217C7.78188 2.83872 6.53995 2.96018 5.46962 3.4522C3.37422 4.41543 2.03514 6.73378 2.00011 9.07122L2 9.0858C2 12.4714 4.03687 15.4422 6.15219 17.5023C7.22378 18.5459 8.35599 19.3965 9.34752 19.9925C9.84287 20.2902 10.3166 20.5325 10.7414 20.7035C11.141 20.8643 11.588 21 12 21C12.412 21 12.859 20.8643 13.2586 20.7035C13.6834 20.5325 14.1571 20.2902 14.6525 19.9925C15.644 19.3965 16.7762 18.5459 17.8478 17.5023C19.9631 15.4422 22 12.4714 22 9.0858L21.9999 9.07122C21.9649 6.73378 20.6258 4.41542 18.5304 3.4522C17.46 2.96018 16.2181 2.83872 14.9297 3.24217C13.9312 3.55481 12.9451 4.16913 12 5.10389Z" fill="#fff"></path></g></svg>
                                      <span style={{ marginLeft: 5 }}>Add to Wishlist</span>
                                    </button>
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div class="col-12">
                        <div className="product-packege">
                          <div className="product-title">
                            <h4>Package Quantity</h4>
                          </div>
                          <ul className="select-packege">

                            {selectedWeight?.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a href="javascript:void(0)" onClick={() => handleWeightClick(item)} className={newset === item ? 'active' : ''}>
                                    {item.weight}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div class="col-12">
                        <div className="pickup-box">
                          <div className="product-info">
                            <ul className="product-info-list product-info-list-2">
                              <li>Best Before : <a href="javascript:void(0)">{productdetail?.bestbefore}</a></li>
                              <li>Product Code : <a href="javascript:void(0)">{productdetail?.ProductCode}</a></li>
                              <li>UPC Code : <a href="javascript:void(0)">{productdetail?.UPCCode}</a></li>
                              {selectedWeight?.map((item, index) => {
                                return (
                                  <li key={index}>Shipping weight : <a href="javascript:void(0)">{item?.ShippingWeight}</a></li>

                                );
                              })}

                              {/* <li>Product Quantity : <a href="javascript:void(0)">{productdetail?.Stock}</a></li> */}

                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div class="col-12">
                        <div className="pickup-box">
                          <div className="product-title">
                            <h4>About this product</h4>
                          </div>
                          <div className="product-info">
                            <ul className="product-info-bullet">
                              {productdetail?.description && Parser(sanitizeDescription(productdetail.description))}
                            </ul>
                          </div>
                          <div className="product-info">

                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div class="col-xxl-3 col-xl-4 col-lg-5 d-lg-block sm-none">
              <div class="right-sidebar-box">
                <div class="vendor-box">
                  <div className="row">
                    <div className="col-4 our-price-text">
                      Our Price
                    </div>
                    <div class="col-8 price-rating">
                      <div class="theme-color price">  ₹ {newset?.price}.0 <del class="text-content">₹ {parseInt(newset?.price) + parseInt(newset?.discountPrice)}</del> <span class="offer theme-color" style={{ fontSize: '12px' }}>(Save ₹ {newset?.discountPrice})</span></div>
                    </div>
                    <div className="py-2">
                      <div className="row">
                        <div className="col-8">

                        </div>
                        <div className="col-4">
                          <div className="quantityes">
                            <button onClick={Decrement} className="decrementes">-</button>
                            <input type="text" className="value incrementss" value={updatequantity} />
                            <button onClick={Iecrement} className="incrementes">+</button>
                          </div>   </div>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <div class="vendor-list">
                        <div className="note-box product-packege">
                          {/* <button type='button' className="btn btn-animation proceed-btn btn-md w-100 mt-4 fw-bold"
                            onClick={() => addtocart(productdetail?._id)}
                          >Add to Cart
                          </button> */}
                          {productdetail?.Stock > 0 ? (
                            <button type='button' className="btn theme-bg-color proceed-btn btn-md w-100 mt-1 fw-bold"
                              onClick={() => addtocart(productdetail?._id)}
                              style={{ color: '#fff' }}
                            >Add to Cart
                            </button>
                          ) : (<button type='button' className="btn theme-bg-color proceed-btn btn-md w-100 mt-1 fw-bold"
                            style={{ color: '#fff' }}

                          >Out Of Stock
                          </button>)}
                        </div>
                        <div class="col-lg-12">
                          <div class="vendor-list">
                            <div className="note-box product-packege">
                              <h6>The price includes *GST and Free shipping on all orders till 31st of July.</h6>
                            </div>

                          </div>
                        </div>

                        <div className="buy-box">
                          <button type='button' className="btn btn-animation text-white btn-md w-100 mt-4 fw-bold"
                            onClick={() => addtowishlist(productdetail?._id)}
                            style={{ color: '#fff' }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 9.09319C4.00302 11.7065 5.60462 14.1966 7.55728 16.0983C8.5206 17.0364 9.53084 17.7924 10.3881 18.3076C10.8172 18.5655 11.1945 18.755 11.4971 18.8768C11.6481 18.9376 11.7707 18.9776 11.8647 19.0014C11.9518 19.0235 11.994 19.0266 11.9997 19.027C12.0004 19.027 12.0005 19.027 12 19.027C11.9994 19.027 11.9996 19.027 12.0003 19.027C12.006 19.0266 12.0482 19.0235 12.1353 19.0014C12.2292 18.9776 12.3519 18.9376 12.5029 18.8768C12.8055 18.755 13.1828 18.5655 13.6118 18.3076C14.4691 17.7924 15.4794 17.0364 16.4427 16.0982C18.3954 14.1966 19.997 11.7065 20 9.09322C19.9719 7.40202 18.9862 5.83837 17.6856 5.24052C17.057 4.95158 16.3321 4.873 15.5348 5.12266C14.724 5.37653 13.7744 5.99163 12.7751 7.20112C12.5852 7.43098 12.3006 7.56438 12 7.56438C11.6994 7.56438 11.4147 7.43098 11.2248 7.20112C10.2256 5.99163 9.27597 5.37653 8.46521 5.12266C7.66791 4.873 6.94295 4.95158 6.31438 5.24052C5.01383 5.83836 4.02807 7.402 4 9.09319ZM12 5.10389C11.0549 4.16913 10.0687 3.55481 9.0703 3.24217C7.78188 2.83872 6.53995 2.96018 5.46962 3.4522C3.37422 4.41543 2.03514 6.73378 2.00011 9.07122L2 9.0858C2 12.4714 4.03687 15.4422 6.15219 17.5023C7.22378 18.5459 8.35599 19.3965 9.34752 19.9925C9.84287 20.2902 10.3166 20.5325 10.7414 20.7035C11.141 20.8643 11.588 21 12 21C12.412 21 12.859 20.8643 13.2586 20.7035C13.6834 20.5325 14.1571 20.2902 14.6525 19.9925C15.644 19.3965 16.7762 18.5459 17.8478 17.5023C19.9631 15.4422 22 12.4714 22 9.0858L21.9999 9.07122C21.9649 6.73378 20.6258 4.41542 18.5304 3.4522C17.46 2.96018 16.2181 2.83872 14.9297 3.24217C13.9312 3.55481 12.9451 4.16913 12 5.10389Z" fill="#fff"></path>
                              </g>
                            </svg>
                            <span className='btn-add-wishlist-label' style={{ color: '#fff' }}> Add to Wishlist</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row sm-none">
            <div className="col-12">
              <div className="product-section-box">
                <ul className="nav nav-tabs custom-nav" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="description-tab" data-bs-toggle="tab"
                      data-bs-target="#description" type="button" role="tab" aria-controls="description"
                      aria-selected="true">Product overview</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="false">Nutritional Information</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#reviewwwww" type="button" role="tab" aria-controls="review" aria-selected="false">Customer Reviews</button>
                  </li>
                </ul>
                <div className="tab-content custom-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                    <div className="product-description">
                      <div className="nav-desh">
                        {productdetail?.ProductOverviewDiscription && Parser(sanitizeDescription(productdetail.ProductOverviewDiscription))}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                    {productdetail?.SupplimentFacts && Parser(sanitizeDescription(productdetail.SupplimentFacts))}
                  </div>
                  <div className="tab-pane fade" id="reviewwwww" role="tabpanel" aria-labelledby="review-tab">
                    <div className="review-box">
                      <div className="row g-4">

                        <div className="col-xl-12">
                          <div className="review-title">
                            <h4 className="fw-500">Add a review</h4>
                          </div>
                          <form onSubmit={AddReview}>
                            <div className="row g-4">
                              <div className="col-md-6">
                                <div className="form-floating theme-form-floating">
                                  <input type="text"
                                    onChange={(e) =>
                                      setreview({
                                        ...review,
                                        name: e.target.value,
                                      })
                                    }
                                    className="form-control" id="name" placeholder="Name" />
                                  <label htmlFor="name">Name</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating theme-form-floating">
                                  <input type="text"
                                    name="title"
                                    onChange={(e) =>
                                      setreview({
                                        ...review,
                                        title: e.target.value,
                                      })
                                    }

                                    className="form-control" id="" placeholder="Upload Image" />
                                  <label htmlFor="review1">Review Title</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating theme-form-floating">
                                  <input type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="form-control" id="" placeholder="Upload Image" />
                                  <label htmlFor="review1">Upload Image</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating theme-form-floating">
                                  <select style={{ color: '#ffb321' }} name="test_star" onChange={(e) =>
                                    setreview({
                                      ...review,
                                      rating: e.target.value,
                                    })
                                  } id="test_star" class="form-control select_reating">
                                    <option value="" class="ggrtext" style={{ color: '#ffb321' }}>Select Rating Star</option>
                                    <option value="1" class="greenText" style={{ color: '#ffb321' }}>★</option>
                                    <option value="2" class="greenText" style={{ color: '#ffb321' }}>★★</option>
                                    <option value="3" class="greenText" style={{ color: '#ffb321' }}>★★★</option>
                                    <option value="4" class="greenText" style={{ color: '#ffb321' }}>★★★★</option>
                                    <option value="5" class="greenText" style={{ color: '#ffb321' }}>★★★★★</option>
                                  </select>
                                  <label htmlFor="review1">Rating Star</label>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-floating theme-form-floating">
                                  <textarea onChange={(e) =>
                                    setreview({
                                      ...review,
                                      comment: e.target.value,
                                    })
                                  } className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" defaultValue={""} />
                                  <label htmlFor="floatingTextarea2">Write Your
                                    Comment</label>
                                </div>
                              </div>
                              <div class="col-12">
                                <div className="form-floating theme-form-floating">
                                  <button type="submit" name="submit" id="submit" class="btn btn-animation proceed-btn btn-md mt-1 fw-bold">Submit Review
                                  </button>
                                </div>
                              </div>



                            </div>
                          </form>
                        </div>
                        <div className="col-12">
                          <div className="review-title">
                            <h4 className="fw-500">Customer Reviews</h4>
                          </div>
                          <div className="review-people">
                            <ul className="review-list">
                              {showreview?.slice(0, visibleReviews).map((showreview1, index) => {
                                // {showreview?.map((showreview1, index) => {
                                const reating = showreview1.rating;
                                const createdAt = new Date(showreview1?.createdAt);
                                const monthNames = [
                                  'January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'
                                ];
                                const formattedDate = `${createdAt.getDate()} ${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}`;

                                const stars = [];
                                for (let i = 0; i < reating; i++) {
                                  stars.push(
                                    <li key={i}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-star fill"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                      </svg>
                                    </li>
                                  );
                                }



                                return (
                                  <li key={index}>
                                    <div className="people-box">
                                      <div className="people-comment">
                                        <a className="name" href="javascript:void(0)">
                                          <img src="https://www.decasys.in/images/images.png" style={{ width: "25px", height: "25px", marginRight: "5px" }} />
                                          {showreview1?.name} <span style={{ color: '#000', fontSize: 13 }}>(Decasys Customer)</span>
                                        </a>
                                        <div className="date-time">
                                          <h6 className="text-content">{formattedDate}</h6>
                                          <div className="product-rating">
                                            <ul className="rating">
                                              {stars}
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="verified-purchase">
                                          <div className="verified-purchase-list">
                                            <ul className="purchase-list">
                                              <li><i className="fa fa-check-circle-o" aria-hidden="true"></i> Verified Purchase</li> |
                                              <li><i className="fa fa-star-o" aria-hidden="true"></i> Best Answer</li> |
                                              <li><i className="fa fa-flag-o" aria-hidden="true"></i> Rewarded Answer</li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="reply">
                                          <p><strong>{showreview1?.title}</strong></p>
                                          <p>{showreview1?.comment}</p>
                                        </div>
                                        {showreview1?.images[0]?.image_name && (
                                          <div className="reply">
                                            <img
                                              className='img-fluid'
                                              style={{ width: '100px', height: '100px', border: '2px solid rgb(194 189 189)', borderRadius: '5px' }}
                                              src={`${imgUrl}/${showreview1?.images[0]?.image_name}`}
                                              onClick={() => openModal(`${imgUrl}/${showreview1?.images[0]?.image_name}`)}
                                              data-bs-toggle="modal"
                                              data-bs-target="#showreview1"
                                            />
                                          </div>
                                        )}

                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                            {visibleReviews < showreview.length && (
                              <div className="row" onClick={handleLoadMore} style={{ textAlign: "center", marginTop: "20px", }}>
                              <div className="col-12">
                                <div className="See-more-answers">
                                <button onClick={handleLoadMore} className="load-more-btn">
                                Load More
                             </button>
                                </div>
                              </div>
                            </div>
                              )}
                            {/* <div style={{zIndex:12}}>
                            <Modal
                              isOpen={modalIsOpen}
                              onRequestClose={closeModal}
                              style={customStyles1}
                              contentLabel="Image Modal"
                            >
                              <div class="review-modal-wrapper">
                                      <div class="modal-content">
                                      <button onClick={closeModal} class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="fa-solid fa-xmark"></i>
                                        </button>
                                      <div class="modal-body">
                                      <div class="row g-4">
                                      {selectedImage && (
                                          <>
                                      <div class="col-12 col-xxl-12">
                                            <img
                                              src={selectedImage}
                                              alt="Review Image"
                                              style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 100px)' }} // Adjust the image to fit within the modal
                                            />
                                      </div>
                                      <div class="col-12 col-xxl-7 d-none">
                                        <div class="review-modal-wrapper-right">
                                          <div class="name">{modelname}</div>
                                          <div class="title">{modeltitle}</div>
                                          <div class="date">{modeldate}</div>
                                          <div class="stars">{modelstar}</div>
                                          <div class="comment">{selectedComment}</div>
                                        </div>
                                      </div>
                                      </>
                                        )}
                                      </div>
                                      </div>
                                      </div>
                                      </div>
                            </Modal>
                            </div> */}

                            {/* review image modal start */}
                            <div className="modal fade theme-modal view-modal" id="showreview1" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered modal-md modal-fullscreen-sm-down">
                                <div className="modal-content">
                                  <div className="modal-header p-0">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                      <i className="fa-solid fa-xmark" />
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="row g-sm-4 g-2">
                                      <div className="col-lg-12">
                                        <div className="slider-image">
                                          {selectedImage && (
                                            <>
                                              <img
                                                src={selectedImage}
                                                className="img-fluid blur-up lazyload"
                                              />
                                            </>
                                          )}

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* review image modal end */}



                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div classname="row">
            <div className="faq-box-contain section-b-space mt-4 d-none sm-block">
              <div className="row">
                <div className="col-xl-12">
                  <div className="faq-accordion">
                    <div className="accordion" id="accordionExample">

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Product Overview <i className="fa-solid fa-angle-down" />
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {productdetail?.ProductOverviewDiscription && Parser(productdetail.ProductOverviewDiscription)}
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Nutritional Information <i className="fa-solid fa-angle-down" />
                          </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {productdetail?.SupplimentFacts && Parser(sanitizeDescription(productdetail.SupplimentFacts))}
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                            Reviews <i className="fa-solid fa-angle-down" />
                          </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {/* for mobile  */}
                            <div className="review-form">
                              {/* <h4 className="fw-500">Add a review</h4> */}
                              <form onSubmit={AddReview}>
                                <div className="form-group">
                                  <label htmlFor="name">Name</label>
                                  <input type="text"
                                    onChange={(e) =>
                                      setreview({
                                        ...review,
                                        name: e.target.value,
                                      })
                                    }
                                    className="form-control" id="name" placeholder="Name" />
                                </div>
                                <div className="form-group mt-2">
                                  <label htmlFor="title">Review Title</label>
                                  <input type="text"
                                    name="title"
                                    onChange={(e) =>
                                      setreview({
                                        ...review,
                                        title: e.target.value,
                                      })
                                    } className="form-control" id="title" placeholder="Enter review title" />
                                </div>
                                <div className="form-group mt-2">
                                  <label htmlFor="title">Upload Image</label>
                                  <input type="file"
                                    name="file"
                                    onChange={handleFileChange} className="form-control" id="title" placeholder="Enter review title" />
                                </div>
                                <div className="form-group mt-2">
                                  <label htmlFor="rating">Rating</label>
                                  <select style={{ color: '#ffb321' }} name="test_star" onChange={(e) =>
                                    setreview({
                                      ...review,
                                      rating: e.target.value,
                                    })
                                  } id="test_star" class="form-control select_reating">
                                    <option value="" style={{ color: '#ffb321' }}>Select Rating Star</option>
                                    <option value="1" style={{ color: '#ffb321' }}><span style={{ color: '#ffb321' }}>★</span></option>
                                    <option value="2" style={{ color: '#ffb321' }}><span style={{ color: '#ffb321' }}>★★</span></option>
                                    <option value="3" style={{ color: '#ffb321' }}><span style={{ color: '#ffb321' }}>★★★</span></option>
                                    <option value="4" style={{ color: '#ffb321' }}><span style={{ color: '#ffb321' }}>★★★★</span></option>
                                    <option value="5" style={{ color: '#ffb321' }}><span style={{ color: '#ffb321' }}>★★★★★</span></option>
                                  </select>
                                </div>
                                <div className="form-group mt-2" style={{ marginBottom: '10px' }}>
                                  <label htmlFor="comment">Comment</label>

                                  <textarea onChange={(e) =>
                                    setreview({
                                      ...review,
                                      comment: e.target.value,
                                    })
                                  } className="form-control" rows="3" placeholder="Leave a comment here" id="floatingTextarea2" defaultValue={""} />
                                  {/* <textarea className="form-control" id="comment" rows="3" placeholder="Leave your comment here"></textarea> */}
                                </div>
                                <button type="submit" className="btn btn-animation proceed-btn btn-md w-100 mt-1 fw-bold">Submit Review</button>
                              </form>
                            </div>

                            <div className="review-list" style={{ marginTop: '20px' }}>
                            {showreview?.slice(0, visibleReviews).map((showreview1, index) => {
                              // { showreview?.map((showreview1, index) => {
                                  const reating = showreview1.rating;
                                  const createdAt = new Date(showreview1?.createdAt);
                                  const monthNames = [
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'
                                  ];
                                  const formattedDate = `${createdAt.getDate()} ${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}`;

                                  const stars = [];
                                  for (let i = 0; i < reating; i++) {
                                    stars.push(
                                      <li key={i}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="feather feather-star fill"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                      </li>
                                    );
                                  }

                                  return (<div className="review-item">
                                    <div className="review-border-box">
                                      <div className="row" style={{ width: '100%' }}>
                                        <div className="col-2">
                                          <div className="reviewer-profile">
                                            <img src="https://www.decasys.in/images/images.png" alt="Profile" className="profile-image" />
                                          </div>
                                        </div>
                                        <div className="col-10">
                                          <div className="reviewer">
                                            {showreview1?.name} &nbsp;
                                            <span style={{ color: '#000', fontSize: 12 }}>(Decasys Customer)</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row" style={{ width: '100%', marginTop: '8px' }}>
                                        <div className="col-12">
                                          <div className="review-content">
                                            {/* <div className="date">{showreview1?.title}</div> */}
                                            <div className="date">{formattedDate}</div>
                                            <div className="rating" style={{ marginTop: '5px' }}>{stars}</div>
                                            <div className="verified-purchase" style={{ marginTop: '8px' }}>
                                              <div className="verified-purchase-list">
                                                <ul class="purchase-list">
                                                  <li><i class="fa fa-check-circle-o" aria-hidden="true"></i> Verified Purchase</li> |
                                                  <li><i class="fa fa-star-o" aria-hidden="true"></i> Best Answer</li>
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="comment" style={{ marginTop: '5px' }}><p><strong>{showreview1?.title}</strong></p></div>
                                            <div className="comment" style={{ marginTop: '5px' }}>{showreview1?.comment} …</div>
                                          
                                            {showreview1?.images[0]?.image_name && (
                                              <div className="reply">
                                                <img
                                                  className='img-fluid'
                                                  style={{ width: '100px', height: '100px', border: '2px solid rgb(194 189 189)', borderRadius: '5px' }}
                                                  src={`${imgUrl}/${showreview1?.images[0]?.image_name}`}
                                                  onClick={() => openModal(`${imgUrl}/${showreview1?.images[0]?.image_name}`)}
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#showreview1mobile"
                                                />
                                              </div>
                                            )}
                                            {/* modelset for mobile*/}
                                            <div className="modal fade theme-modal view-modal" id="showreview1mobile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                              <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down mob-zoom-modal">

                                                <div className="modal-content">
                                                  <div className="modal-header p-0">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                      <i className="fa-solid fa-xmark" />
                                                    </button>
                                                  </div>

                                                  <div className="modal-body">
                                                    <div className="row g-sm-4 g-2">
                                                      <div className="col-lg-12">
                                                        <div className="slider-image">
                                                          {selectedImage && (
                                                            <>
                                                              <img
                                                                src={selectedImage}
                                                                className="img-fluid blur-up lazyload"
                                                              />
                                                            </>
                                                          )}

                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>


                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  </div>)
                                })}

                             {visibleReviews < showreview.length && (
                              <div className="row" onClick={handleLoadMore} style={{ textAlign: "center", marginTop: "20px", }}>
                              <div className="col-12">
                                <div className="See-more-answers">
                                <button onClick={handleLoadMore} className="load-more-btn">
                                Load More
                             </button>
                                </div>
                              </div>
                            </div>
                              )} 
                            </div>
                            {/* for Mobile */}
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Questions and Answers <i className="fa-solid fa-angle-down" />
                          </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {/* Product Q and A Section start */}
                            <div className="row" id="questionAnswer">
                              <div className="col-12">
                                <div className="product-section-box">
                                  <div className="tab-content custom-tab">
                                    <div className="">
                                      <div className="review-box">
                                        <div className="row g-4">

                                          <div className="col-12">
                                            {/* <div className="review-title">
                                              <h4 className="fw-500" style={{ fontSize: "22px", fontWeight: "700" }}>Questions and Answers</h4>
                                            </div> */}
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
                                              </ul>
                                            </div>
                                            <div className="row" style={{ textAlign: "center", marginTop: "20px", }}>
                                              <div className="col-12">
                                                <div className="See-more-answers">
                                                  <Link className="name" to={`/questionanswer/${_id?.id}`}>
                                                    See All 25 Q&A <i class="fa-solid fa-chevron-right"></i>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Product Q and A Section End */}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Q and A Section start */}
          <div className="row sm-none" id="questionAnswer1">
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
                            </ul>
                          </div>
                          <div className="row" style={{ textAlign: "center", marginTop: "20px", }}>
                            <div className="col-12">
                              <div className="See-more-answers">
                                <Link className="name" to={`/questionanswer/${_id?.id}`}>
                                  See All 25 Q&A <i class="fa-solid fa-chevron-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Q and A Section End */}

        </div>
      </section>
      {/* Product Left Sidebar End */}



      {/* Releted Product Section Start */}
      <ReletedProduct />
      {/* Releted Product Section End */}

      {/* modelset */}
      {/* style={{ height: '800px', width: '950px' }} */}
      <div className="modal fade theme-modal view-modal" id="view1567576" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content" style={{ height: '561px' }}>

            <div className="modal-header p-0">
              <h4 className="title-name">
                {productdetail?.name}
              </h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <div className="row g-sm-4 g-2">

                <div className="col-lg-10">
                  <div className="popup-image-container">
                    <button className="arrow left-arrow" onClick={handleLeftArrowClick} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
                      <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </button>
                    <div onClick={handleZoomToggle}
                      //  onMouseMove={handleMouseMove}
                      onMouseMove={checkmousemoveheight}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={handleMouseLeave} className="cccccc slider-image1 d-flex justify-content-center align-items-center position-relative image-container" style={{ height: "auto", width: "" }}>

                      <img src={largeImage} id="zoomImg" className={isZoomed ? 'img-fluid blur-up lazyload zoomed product-image thisimgblock' : 'img-fluid blur-up lazyload thisimgblock'} alt="" style={{ maxHeight: setheight, maxWidth: setweidth, backgroundSize: 'cover' }} />

                      {isHovered && (
                        <div
                          className="zoom-icon1"
                          style={{ left: cursorPosition.x, top: cursorPosition.y, zIndex: 99999999999 }}
                        >
                        </div>
                      )}

                    </div>
                    <button className="arrow right-arrow" onClick={handleRightArrowClick} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
                      <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                <div className="col-lg-2">
                  <div className="right-sidebar-modal ">
                    {smallImages.map((imageUrl, index) => (
                      <div className={`slick-bottom-image1 d-flex justify-content-center align-items-center position-relative ${index === activeIndex1 ? 'active' : ''}`}
                        key={index} style={{ padding: "10px" }}>
                        <img
                          src={imageUrl} style={{ height: '100px' }}
                          className="img-fluid blur-up lazyload"
                          alt=""
                          onClick={() => handleSmallImageClick(imageUrl, index)}

                        />
                      </div>
                    ))}
                    {/* Other details of the modal */}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modelsetend */}

      {/* modelset for mobile*/}
      <div className="modal fade theme-modal view-modal" id="view1567576333" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down mob-zoom-modal">

          <div className="modal-content">
            <div className="modal-header p-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-body-inner-wrapper">
                <div className="modal-image-container">
                  <div className="modal-image-container-inner">
                    <TransformWrapper initialScale={1}
                      initialPositionX={0}
                      initialPositionY={0}>
                      <TransformComponent>
                        <div id="your-element-id" className="cccccc1 slider-image2 
                      d-flex justify-content-center align-items-center position-relative formobileimg"
                          style={isZoomed ? { height: "534px", maxWidth: "110%" } : { height: "534px", maxWidth: "100%" }}
                        >
                          <img src={`${largeImage}`} id="zoomImgss" className={`img-fluid blur-up lazyload`} alt=""
                            style={{ maxHeight: "130%", maxWidth: "130%" }}
                          />
                        </div>

                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </div>
                <div className="right-sidebar-modal">
                  <div className="right-sidebar-modal-inner">

                    <Slider {...settings2} style={{ width: `${17 * uniqueImages.length}%` }}>
                      {uniqueImages.map((imageUrl, index) => (
                        <div className={`slick-bottom-image1 d-flex justify-content-center align-items-center position-relative ${index === activeIndex1 ? 'active' : ''}`}
                          key={index} style={{ padding: "10px" }}>
                          <img
                            src={imageUrl}
                            className="img-fluid blur-up lazyload"
                            alt=""
                            onClick={() => handleSmallImageClick(imageUrl, index)}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* modelset for mobile*/}


      {/* Modal AskQuestion Start*/}
      <div className="modal fade drawer right-align" id="exampleModalRight" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Right Align Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal AskQuestion end*/}



    </div>

  )
}

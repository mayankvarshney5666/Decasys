// import React from 'react';

// const Rating = ({ rating }) => {
//   alert(rating)
//   const fullStars = Math.floor(rating);

//   const fractionalPart = 0.5;
//   const partialWidth = 18.18 - (53 * fractionalPart); 
//     const stars = [];
//    for (let i = 0; i < fullStars; i++) {
//     stars.push(
//       <li key={i}>
//           <i class="fa fa-star" aria-hidden="true"></i>
//       </li>
//     );
//   }
//    if (fractionalPart > 0) {
//     stars.push(
//       <li key="partial">
//           <i class="fa fa-star-half-o" aria-hidden="true"></i>
//       </li>
//     );
//   }
  
//   return (
//     <div className="rating-container">
//       <ul className="rating">
//         {stars}
//       </ul>
//     </div>
//   );
// };

// export default Rating;


import React from 'react';

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <li key={i}>
        <i className="fa fa-star" aria-hidden="true"></i>
      </li>
    );
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(
      <li key="half">
        <i className="fa fa-star-half-o" aria-hidden="true"></i>
      </li>
    );
  }

  return (
    <div className="rating-container">
      <ul className="rating">
        {stars}
      </ul>
    </div>
  );
};

export default Rating;

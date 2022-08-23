import { Rating } from 'semantic-ui-react';


function Review({review}) {
  /*
   *  review: {
   *    account: {
   *      id: '',
   *      name: '',
   *    },
   *    rating: 4,
   *    reviewText: '',
   *    createdAt: ''
   *  }
   */
  return (
    <div className='review'>
      <Rating icon='star' rating={review.rating} maxRating={5} disabled={true}/>
      <div className='review-text'>{review.reviewText}</div>
      <div className='review-name'>{`- ${review.account.name}`}</div>
    </div>
  );
}

export default Review;
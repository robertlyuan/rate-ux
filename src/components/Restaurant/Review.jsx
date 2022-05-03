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
      <div className='review-name'>{review.account.name}</div>
      <div className='rating'>{`${review.rating}/5`}</div>
      <div className='review-text'>{review.reviewText}</div>
    </div>
  );
}

export default Review;
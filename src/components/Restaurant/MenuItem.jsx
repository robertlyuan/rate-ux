function MenuItem({item}) {
  /*
   *  item: {
   *    name: ''
   *    rating: 4,
   *    description: '',
   *    createdAt: '',
   *    id: ''
   *  }
   */
  return (
    <div className='review'>
      <div className='review-name'>{item.name}</div>
      <div className='rating'>{`${item.rating}/5`}</div>
      <div className='review-text'>{item.description}</div>
    </div>
  );
}

export default MenuItem;
import { useState } from 'react';
import RestaurantInfo from "./RestaurantInfo";
import Review from './Review';
import Tabs from '../Tabs/Tabs';
import './Restaurant.css';
import MenuItem from './MenuItem';
import { v4 as uuid } from 'uuid';


function Restaurant() {
  const initialReviews = [
    {
      account: {
        id: uuid(),
        name: 'Ruby'
      },
      rating: '4',
      reviewText: 'Very good',
      createdAt: new Date('05 October 2011 14:48 UTC').toISOString()
    },
    {
      account: {
        id: uuid(),
        name: 'Yuby'
      },
      rating: '1',
      reviewText: 'Very bad',
      createdAt: new Date('17 November 2015 14:48 UTC').toISOString()
    }
  ];
  const initialItems = [
    {
      rating: '4',
      name: 'Ruby Tail',
      description: 'Docked tail',
      id: uuid()
    },
    {
      rating: '1',
      name: 'Ruby Poop',
      description: 'Poop',
      id: uuid()
    }
  ];
  const [showAddReview, setShowAddReview] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [ratingInput, setRatingInput] = useState('');
  const [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState(initialReviews);
  const [itemNameInput, setItemNameInput] = useState('');
  const [itemInput, setItemInput] = useState('');
  const [itemRatingInput, setItemRatingInput] = useState('');
  const [items, setItems] = useState(initialItems);

  const addReview = () => {
    const newReview = {
      account: {
        id: uuid(),
        name: 'Ruby'
      },
      rating: ratingInput,
      reviewText: reviewInput,
      createdAt: new Date().toISOString()
    };
    setReviews([newReview, ...reviews]);
    setRatingInput('');
    setReviewInput('');
  };

  const addItem = () => {
    const newItem = {
      name: itemNameInput,
      rating: itemRatingInput,
      description: itemInput,
      createdAt: new Date().toISOString(),
      id : uuid()
    };
    setItems([newItem, ...items]);
    setItemNameInput('');
    setItemInput('');
    setItemRatingInput('');
  };

 return (
   <div className='container'>
    <div className='restaurant'>
      <RestaurantInfo
        info={{
          name: 'Resto Raunt',
          address: {
            street1: '77 W Huron',
            city: 'Chicago',
            state: 'IL',
            zipCode: '60654'
          }
        }}
      />
      <Tabs>
        <div label='Reviews'>
          <div
            className='add-review-button'
            onClick={() => setShowAddReview(true)}
          >{'Add a review'}</div>
          {
            showAddReview && 
            <div className='add-review'>
              <div className='rating'>
                {'Rating: '} <input
                                className='rating-input'
                                type='text'
                                value={ratingInput}
                                onChange={(event) => setRatingInput(event.target.value)}
                            />
                {' / 5'}
              </div>
              <textarea
                className='review-input'
                value={reviewInput}
                onChange={event => setReviewInput(event.target.value)}
              />
              <div
                className='submit-button'
                onClick={() => {
                  addReview();
                  setShowAddReview(false);
                }}
              >
                {'Submit'}
              </div>
            </div>
          }
          {
            reviews.map(review => {
              return <Review review={review} key={review.account.id}/>;
            })
          }
        </div>
        <div label='Menu'>
          <div
            className='add-review-button'
            onClick={() => setShowAddItem(true)}
          >{'Add a menu item'}</div>
          {
            showAddItem && 
            <div className='add-item'>
              <div className='item-name'>
                {'Item Name'} <input
                                className='item-name-input'
                                type='text'
                                value={itemNameInput}
                                onChange={(event) => setItemNameInput(event.target.value)}
                            />
              </div>
              <div className='rating'>
                {'Rating: '} <input
                                className='rating-input'
                                type='text'
                                value={itemRatingInput}
                                onChange={(event) => setItemRatingInput(event.target.value)}
                            />
                {' / 5'}
              </div>
              <textarea
                className='review-input'
                value={itemInput}
                onChange={event => setItemInput(event.target.value)}
              />
              <div
                className='submit-button'
                onClick={() => {
                  addItem();
                  setShowAddItem(false);
                }}
              >
                {'Submit'}
              </div>
            </div>
          }
          {
            items.map(item => {
              return <MenuItem item={item} key={item.id}/>;
            })
          }
        </div>
      </Tabs>
    </div>
   </div>
 )
}

export default Restaurant;
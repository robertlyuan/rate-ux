import { useState, useEffect } from 'react';
import RestaurantInfo from "./RestaurantInfo";
import Review from './Review';
import './Restaurant.css';
import MenuItem from './MenuItem';
import { v4 as uuid } from 'uuid';
import { Tab, Button, Modal, Rating, Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import * as axios from 'axios';


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
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
        headers: {
          Authorization: 'Bearer Nvcg9KS82yWjxlwVH9KxZskPJDL5CCuehtaPoko11AuiEpH0enLI7VCYCeEP76CiVg7HzMoyV8hKChHuYxBgbTEbHsOw2w9HJRQ86e4CQJs9fzw4XFv4yar6ORjLXnYx',
        }
      });

      setRestaurantInfo(res.data);
    }
    fetchData();
  }, [id]);


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

  const panes = [
    { menuItem: 'Reviews', render: () => (
      <div label='Reviews'>
        <Modal
          onClose={() => setShowAddReview(false)}
          onOpen={() => setShowAddReview(true)}
          open={showAddReview}
          trigger={<Button className='add-review-button' positive>{'Add a review'}</Button>}
        >
          <Modal.Header>
            {'Write a Review'}
          </Modal.Header>
          <Modal.Content>
            <div className='add-review'>
              <div className='rating'>
              {'Rating: '}  <Rating
                  icon='star'
                  maxRating={5}
                  onRate={(e, {rating}) => setRatingInput(rating)}
                />
              </div>
              <textarea
                className='review-input'
                value={reviewInput}
                onChange={event => setReviewInput(event.target.value)}
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setShowAddReview(false)}
              color='black'
            >
              {'Cancel'}
            </Button>
            <Button
              className='submit-button'
              onClick={() => {
                addReview();
                setShowAddReview(false);
              }}
              positive
            >
              {'Submit'}
            </Button>
          </Modal.Actions>
        </Modal>
        {
          reviews.map(review => {
            return <Review review={review} key={review.account.id}/>;
          })
        }
      </div>)
    },
    { menuItem: 'Menu', render: () => (
      <div label='Menu'>
        <Modal
          onClose={() => setShowAddItem(false)}
          onOpen={() => setShowAddItem(true)}
          open={showAddItem}
          trigger={<Button className='add-review-button' positive>{'Add a menu item'}</Button>}
        >
          <Modal.Header>
            {'Add a Menu Item'}
          </Modal.Header>
          <Modal.Content>
            <div className='add-item'>
              <div className='item-name'>
                {'Item Name'} <input
                                className='item-name-input'
                                type='text'
                                value={itemNameInput}
                                onChange={(event) => setItemNameInput(event.target.value)}
                            />
              </div>
              {'Rating: '}  <Rating
                  icon='star'
                  maxRating={5}
                  onRate={(e, {rating}) => setItemRatingInput(rating)}
                />
              <textarea
                className='review-input'
                value={itemInput}
                onChange={event => setItemInput(event.target.value)}
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setShowAddItem(false)}
              color='black'
            >
              {'Cancel'}
            </Button>
            <Button
              className='submit-button'
              onClick={() => {
                addItem();
                setShowAddItem(false);
              }}
              positive
            >
              {'Submit'}
            </Button>
          </Modal.Actions>
        </Modal>
        {
          items.map(item => {
            return <MenuItem item={item} key={item.id}/>;
          })
        }
        </div>
    ) }
  ];

  console.log({
    restaurantInfo
  });

  if (!restaurantInfo) {
    return null;
  }
 return (
   <div className='container'>
    <div className='restaurant'>
      <Container style={{width: '75%', backgroundColor: 'white', borderRadius: '5px', padding: '15px', marginBottom: '20px'}}>
          <RestaurantInfo
            info={restaurantInfo}
          />
      </Container>
      <Container style={{width: '75%', backgroundColor: 'white', borderRadius: '5px', padding: '15px'}}>
        <Tab panes={panes}/>
      </Container>
    </div>
   </div>
 )
}

export default Restaurant;
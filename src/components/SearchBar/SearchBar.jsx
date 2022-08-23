import _ from 'lodash';
import { faker } from '@faker-js/faker';
import React from 'react';
import { Search } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import './SearchBar.css';
import * as axios from 'axios';

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
  id: faker.random.alphaNumeric(10)
}));

source.push({
  title: 'Resto Raunt',
  description: 'Ruby\'s Restaurant',
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
  id: 'test-id'
});

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }

    default:
      throw new Error()
  }
}

let mostRecentRequest = null;

function SearchBar() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;
  const navigate = useNavigate();

  const queryResults = async (e, data) => {
    if (mostRecentRequest) {
      console.log({mostRecentRequest});
      mostRecentRequest.cancel();
    }

    mostRecentRequest = axios.CancelToken.source();
    let results;
    dispatch({ type: 'START_SEARCH', query: data.value });

    if (data.value.length === 0) {
      dispatch({ type: 'CLEAN_QUERY' });
      return;
    }

    try {
      results = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${data.value}&location=chicago,il`, {
        headers: {
          Authorization: 'Bearer Nvcg9KS82yWjxlwVH9KxZskPJDL5CCuehtaPoko11AuiEpH0enLI7VCYCeEP76CiVg7HzMoyV8hKChHuYxBgbTEbHsOw2w9HJRQ86e4CQJs9fzw4XFv4yar6ORjLXnYx',
        },
        cancelToken: mostRecentRequest.token
      });
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Previous call cancelled for new call');
      } else {
        throw new Error(e);
      }
    }
    if (results) {
      dispatch({
        type: 'FINISH_SEARCH',
        results: results.data.businesses.map(b => {
          return {
            title: b.name,
            price: b.price,
            id: b.id,
            image: b.image_url,
            description: `${b.location.address1}, ${b.location.city}`
          }
        }).slice(0,4)
      });
    }
  };

  return (
    <Search
      loading={loading}
      placeholder='Search...'
      onResultSelect={(e, data) =>{
          console.log(data);
          navigate(`/restaurants/${data.result.id}`, { replace: true });
        }
      }
      onSearchChange={queryResults}
      results={results}
      value={value}
      fluid={true}
      style={{width: '75%'}}
    />
  )
}

export default SearchBar;
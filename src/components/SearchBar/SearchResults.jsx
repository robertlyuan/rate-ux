import { Link } from 'react-router-dom';

function SearchResults({results}) {
  return (
    <div>
      { results.map(result => {
        return (
          <Link
            key={result.id}
            to={`/restaurants/${result.id}`}
          >
            <div>
              {result.name}
            </div>
          </Link>
        )
      })}
    </div>
  );
}

export default SearchResults;
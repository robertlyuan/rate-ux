import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Outlet } from 'react-router-dom';
import SearchExampleStandard from '../SearchBar/SearchBar';

function Nav() {
  return (
    <>
      <div className='nav'>
        {/* <SearchBar /> */}
        <SearchExampleStandard />
      </div>
      <Outlet />
    </>
  )
}

export default Nav;
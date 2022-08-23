import './Nav.css';
import { Outlet } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

function Nav() {
  return (
    <>
      <div className='nav'>
        <SearchBar />
      </div>
      <Outlet />
    </>
  )
}

export default Nav;
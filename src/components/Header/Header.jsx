import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { FirebaseContext } from "../../store/Context";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(FirebaseContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/login'); 
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>  
        <div className="placeSearch">
          <Search />
          <input
            className="inputSearch"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          {user ? (
            <span
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </span>
          ) : (
            <span
              onClick={() => navigate('/login')} 
              style={{ cursor: 'pointer' }}
            >
              Login
            </span>
          )}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <span
              onClick={() => navigate('/create')}
              style={{ cursor: 'pointer' }}
            >
              <SellButtonPlus />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

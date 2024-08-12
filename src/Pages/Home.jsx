import React from 'react';

import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';

import Posts from '../components/Posts/Posts';
import Footer from '../components/Footer/Footer';

function Home({setSearch, search}) {
  return (
    <div className="homeParentDiv">
      <Header setSearch={setSearch} />
      <Banner />
      <Posts  search={search} />
      <Footer />
    </div>
  );
}

export default Home;
 

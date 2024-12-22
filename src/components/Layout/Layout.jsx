import React from 'react';
import Header from '../Header/Header';
import Routers from '../../router/Routers';
import Footer from '../Footer/Footer';
import ChatBox from '../Chatbox/ChatBox';

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
      <ChatBox />
    </>
  );
}

export default Layout;

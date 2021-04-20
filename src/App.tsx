import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ChatSideBars from './components/ChatSideBar/ChatSideBar';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <div className="chatApp">
      <ChatSideBars />
      <Chat />
    </div>
  );
}

export default App;

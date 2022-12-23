import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import Auth from './components/auth/Auth';

const apiKey = 'kkkhqz2qtsx6';

const authToken = false;

const App = () => {
  if(!authToken) return <Auth />;

  return (
    <div>
        <h1>Waste My Time</h1>
    </div>
  );
}

export default App;
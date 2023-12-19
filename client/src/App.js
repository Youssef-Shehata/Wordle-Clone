// App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './Routes';
import { KeyboardHistoryProvider } from './Components/context';

const App = () => {
  useEffect(async () => {
    await axios.post('http://localhost:8080/words/reset').then(response => {
      console.log(response.data)
      // Process the response data as needed
    });


  }, [])
  return (
    <KeyboardHistoryProvider>
      <Router>

        {/* Add any common layout or components */}
        <MyRoutes />

      </Router>
    </KeyboardHistoryProvider>
  );
};

export default App;

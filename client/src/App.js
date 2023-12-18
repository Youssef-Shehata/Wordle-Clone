// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './Routes';
import { WordProvider } from './Components/context';

const App = () => {
  return (
    <WordProvider>
      <Router>
        <div>
          {/* Add any common layout or components */}
          <MyRoutes />
        </div>
      </Router>
    </WordProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookList from '../../components/BookList';
import { ROUTES } from '../../constants';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path={ROUTES.ROOT}>
          <BookList />
        </Route>
      </Router>
    </div>
  );
}

export default App;

import * as history from 'history';
import React from 'react';
import { Router } from 'react-router';
import './App.css';
import { AuthProvider } from './context/AuthenticationContext';
import { Header } from './presentation/header/Header';
import { RoutesConfig } from './route/Route';

const browserHistory = history.createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={browserHistory}>
        <AuthProvider>
          <Header />
          <RoutesConfig />
        </AuthProvider>
    </Router>
  );
};

export default App;

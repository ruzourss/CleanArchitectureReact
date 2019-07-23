import React, { ChangeEvent, useContext, useState } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const loginContext = useContext(AuthenticationContext);

  const updateUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };

  const login = () => {
    loginContext.handleLogin(username, password);
  };

  return !loginContext.isAuthenticated ? (
    <div>
      <input type="input" placeholder="username" onChange={updateUserName} />
      <input type="password" placeholder="password" onChange={updatePassword} />
      <button type="submit" onClick={login}>
        Enviar
      </button>
    </div>
  ) : (
    <React.Fragment>
      <div>Welcome!!</div>
      <button onClick={loginContext.handleLogout}>Logout</button>
    </React.Fragment>
  );
};

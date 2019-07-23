import React, { useReducer } from 'react';
import { loginService } from '../../src/service/login/LoginService';
import { isRight } from '../commons/Either';

export interface IAuthContext {
  isAuthenticated: boolean;
  username?: string;
  handleLogin(username: string, password: string): void;
  handleLogout(): void;
}

export const AuthenticationContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  username: undefined,
  handleLogin(username: string, password: string): void {
    throw Error('Handling login not implemented');
  },
  handleLogout(): void {
    throw Error('Handling login not implemented');
  }
});

interface ILoginState {
  isAuthenticated: boolean;
  username?: string;
}

type IAction =
  | {
      type: 'login_successful';
      payload: string;
    }
  | {
      type: 'login_error';
      payload: Error;
    }
  | {
      type: 'logout';
    };

const initialState: ILoginState = { isAuthenticated: false, username: undefined };

export const loginReducer = (state: ILoginState, action: IAction) => {
  switch (action.type) {
    case 'login_successful':
      return { ...state, isAuthenticated: true, username: action.payload };
    case 'login_error':
      return { ...state, isAuthenticated: false };
    case 'logout':
      return { ...state, isAuthenticated: false };
  }
};

export const AuthProvider: React.FC = props => {
  const [loginState, updateLoginState] = useReducer(loginReducer, initialState);

  const login = (username: string, password: string) => {
    loginService(username, password).then(result => {
      if (isRight(result)) {
        updateLoginState({ type: 'login_successful', payload: username });
      } else {
        updateLoginState({ type: 'login_error', payload: result.l });
      }
    });
  };

  const logout = () => {
    updateLoginState({ type: 'logout' });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: loginState.isAuthenticated,
        username: loginState.username,
        handleLogin: login,
        handleLogout: logout
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

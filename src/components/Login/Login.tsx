'use client';
import { useEffect, useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { LoginProps } from './types';

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      localStorage.setItem('googleToken', credentialResponse.credential);
      setIsLoggedIn(true);
      onLoginSuccess(credentialResponse.credential);
    }
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Błąd logowania');
            alert('Wystąpił błąd podczas logowania');
          }}
        />
      ) : (
        <p>Zalogowano pomyślnie!</p>
      )}
    </div>
  );
};

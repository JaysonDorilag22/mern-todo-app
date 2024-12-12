import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logOut } from '../redux/actions/authActions';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Welcome, {user ? user.name : 'Guest'}!</h1>
      {user && user.avatar && (
        <img src={user.avatar.url} alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
      )}
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
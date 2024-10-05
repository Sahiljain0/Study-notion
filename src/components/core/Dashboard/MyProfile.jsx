import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

 const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
  return (
    <div>MyProfile</div>
  )
}
export default MyProfile;
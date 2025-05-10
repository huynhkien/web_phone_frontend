import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { apiLoginGoogle } from "../../../apis";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import {login} from '../../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import  path from '../../../utils/path';
const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [socketConnected, setSocketConnected] = useState(false);
 
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log(decodedToken)

      const data = {
        email: decodedToken.email,
        name: decodedToken.name,
        sub: decodedToken.sub,
        type: 2,
        password: '123456789'
      };
      // dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
      const response = await apiLoginGoogle(data);
      // dispatch(showModal({ isShowModal: false, modalType: null }));
      if (response?.success) {
        Swal.fire( 'Congratulations' , response.message, 'success' ).then(() => {
          dispatch(login({ isLogin: true, token: response.accessToken, userData: response.userData }));
          if (response?.userData?.role === '2002' || response?.userData?.role === '2006') {
            navigate(`/${path.ADMIN}`)
          } else if(response?.userData?.role === '2004') {
            navigate(`/${path.HOME}`)
          }
        })
      } else {
        Swal.fire('Oop!', response.message, 'error');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  return (
    <div className='google-login-container '>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
        width='100%'
        theme="filled_blue"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
      />
    </div>
  );
}

export default LoginGoogle;
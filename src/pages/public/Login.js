import React, { useState, useCallback, useEffect } from 'react';
import { FaUserLock, FaRegUser, FaAddressBook, FaPhone, FaKey, FaRegistered } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CiMail } from 'react-icons/ci';
import { Input, Button, LoginGoogle } from '../../components/index';
import { apiLogin, apiRegister } from '../../apis';
import Swal from 'sweetalert2';
import { validate } from '../../utils/helper';
import { login } from '../../store/user/userSlice';
import { showModal } from '../../store/app/appSlice';
import { useDispatch } from 'react-redux';
import path from '../../utils/path';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayLoad] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: ''
  });
  const [invalidFields, setInValidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);

  const resetPayload = () => {
    setPayLoad({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      address: ''
    });
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { confirmPassword, ...data } = payload;
    const { name, phone, address, ...loginData } = data;

    const invalids = isRegister ? validate(payload, setInValidFields) : validate(data, setInValidFields);

    try {
      if (isRegister) {
        if (payload.password !== payload.confirmPassword) {
          Swal.fire(
            'Vui lòng nhập lại mật khẩu',
            'Mật khẩu bạn nhập lại không đúng',
            'error'
          );
          resetPayload();
        } else {
          try {
            console.log(payload);
            const response = await apiRegister(payload);
            if (response.success) {
              dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
              dispatch(showModal({ isShowModal: false, modalType: null }));
              Swal.fire('Congratulations', response.message, 'success').then(() => {
                setIsRegister(false);
                resetPayload();
              });
            }
          } catch (response) {
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
            Swal.fire('Oop!', response.message, 'error');
            resetPayload();
          }
        }
      } else {
        try {
          const response = await apiLogin(loginData);
          if (response.success) {
            dispatch(login({ isLogin: true, token: response.accessToken, userData: response.userData }));
            if (response?.userData?.role === '2002' || response?.userData?.role === '2006') {
              navigate(`/${path.ADMIN}`);
            } else if (response?.userData?.role === '2004') {
              navigate(`/${path.HOME}`);
            }
          } else {
            Swal.fire('Oop!', response.message, 'error');
            resetPayload();
          }
        } catch (response) {
          Swal.fire('Oop!', response.message, 'error');
          resetPayload();
        }
      }
    } catch (e) {
      console.log("Lỗi:", e);
      resetPayload();
    }

    setTimeout(() => {
      setInValidFields([]);
    }, 3000);
  }, [isRegister, payload, dispatch, navigate]);

  return (
    <div className="row justify-content-center py-5">
      <div className="col-lg-6 col-sm-12">
        <div className="login-container">
          <div className="login-container--item d-flex mb-20">
            <div className="login--item-icon">
              {!isRegister ? <FaUserLock /> : <FaRegistered />}
            </div>
            <div className="login--item-content">
              <h4 className="login--item-title">{isRegister ? 'Đăng kí' : 'Đăng nhập'}</h4>
              <p>{isRegister ? 'Điền đầy đủ các thông tin để đăng ký tài khoản' : 'Vui lòng đăng nhập tài khoản và mật khẩu'}</p>
            </div>
          </div>
          
          <Input
            iconClass={<CiMail />}
            value={payload.email}
            setValue={setPayLoad}
            nameKey="email"
            placeholder="Email"
            invalidFields={invalidFields}
            setInValidFields={setInValidFields}
          />

          <Input
            iconClass={<FaKey />}
            value={payload.password}
            setValue={setPayLoad}
            nameKey="password"
            type="password"
            placeholder="Mật khẩu"
            invalidFields={invalidFields}
            setInValidFields={setInValidFields}
          />

          {isRegister && (
            <>
              <Input
                iconClass={<FaKey />}
                value={payload.confirmPassword}
                setValue={setPayLoad}
                nameKey="confirmPassword"
                type="password"
                secureTextEntry={true}
                placeholder="Nhập lại mật khẩu"
                invalidFields={invalidFields}
                setInValidFields={setInValidFields}
              />
              <Input
                iconClass={<FaRegUser />}
                value={payload.name}
                setValue={setPayLoad}
                nameKey="name"
                placeholder="Tên người dùng"
                invalidFields={invalidFields}
                setInValidFields={setInValidFields}
              />
              <Input
                iconClass={<FaPhone />}
                value={payload.phone}
                setValue={setPayLoad}
                nameKey="phone"
                placeholder="Số điện thoại"
                invalidFields={invalidFields}
                setInValidFields={setInValidFields}
              />
              <Input
                iconClass={<FaAddressBook />}
                value={payload.address}
                setValue={setPayLoad}
                nameKey="address"
                placeholder="Địa chỉ nhà"
                invalidFields={invalidFields}
                setInValidFields={setInValidFields}
              />
            </>
          )}

          {!isRegister && (
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-white">
                <span style={{ cursor: 'pointer' }} onClick={() => setIsRegister(true)}>Tạo tài khoản</span>
              </div>
              <div>
                <a href={`/${path.FORGOT_PASSWORD}`} className="text-white">Quên mật khẩu?</a>
              </div>
            </div>
          )}

          <Button
            name={isRegister ? 'Đăng kí' : 'Đăng nhập'}
            handleOnClick={handleSubmit}
          />

          {isRegister && (
            <div className="text-center text-white pt-2">
              <span style={{ cursor: 'pointer' }} onClick={() => setIsRegister(false)}>Đăng nhập</span>
            </div>
          )}

          {!isRegister && (
            <div className="login-google">
              <span className="p-2 text-white">Hoặc</span>
              <LoginGoogle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
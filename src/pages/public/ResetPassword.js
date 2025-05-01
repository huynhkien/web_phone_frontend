import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { Button, Input } from '../../components/index';
import { apiResetPassword } from '../../apis';
import {showModal} from "../../store/app/appSlice"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { validate } from '../../utils/helper';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalidFields, setInValidFields] = useState([]);
  const {token} = useParams();

  const handleResetPassword =async () => {
    const payload = {password, confirmPassword};
    validate(payload, setInValidFields);
   
    try{
      dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
        const response = await apiResetPassword({password, token});
        dispatch(showModal({ isShowModal: false, modalType: null }));
        if (payload.password !== payload.confirmPassword) {
          Swal.fire(
            'Vui lòng nhập lại mật khẩu',
            'Mật khẩu bạn nhập lại không đúng', 
            'error'
          );
        }else{
          if(response.success){
              Swal.fire(
                response.message,
                'Cập nhật thành công',
                'success'
              )
          }else{
            Swal.fire(
              response.message,
              'Lỗi trong quá trình cập nhật',
              'error'
            ).then((rs) => {
              if(rs.isConfirmed) navigate('/forgot-password')
           })
          }
      }
    }catch(response){
        dispatch(showModal({isShowModal: false, modalChildren: null}));  
        Swal.fire(
          response.message,
          'Cập nhật thất bại',
          'error'
        ).then((rs) => {
          if(rs.isConfirmed) navigate('/forgot-password')
       });
       
    }
  }

  return (
    <div className="row justify-content-center py-5">
      <div className="col-lg-6 col-sm-12">
        <div className="login-container">
            <div className="login-container--item d-flex mb-20">
                <div className="login--item-icon">
                  <FaKey />
                </div>
                <div className="login--item-content">
                  <h4 className="login--item-title">Quên mật khẩu</h4>
                  <p>Vui lòng nhập mật khẩu mới.</p>
                </div>
              </div>
                <Input
                          iconClass={<FaKey/>}
                          type='password' 
                          id='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='Nhập mật khẩu mới'
                          invalidFields={invalidFields}
                          setInValidFields={setInValidFields}
                          />
                <Input
                          iconClass={<FaKey/>}
                          type='password' 
                          id='confirmPassword'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder='Nhập mật khẩu lần nữa'
                          invalidFields={invalidFields}
                          setInValidFields={setInValidFields}
                          />
              <Button
                name="Đặt mật khẩu mới"
                handleOnClick={handleResetPassword}
              />
            </div>
          </div>
        </div>
  );
};

export default ResetPassword;
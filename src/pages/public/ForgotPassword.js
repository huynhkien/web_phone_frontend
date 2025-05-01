import React, { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { Input, Button} from '../../components/index';
import { apiForgotPassword } from '../../apis';
import { showModal } from "../../store/app/appSlice";
import path from '../../utils/path';
import { validate } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const Forgot = () => { 
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [invalidFields, setInValidFields] = useState([]);

  const handleForgotPassword = async () => {
    const payload = { email };
    validate(payload, setInValidFields);
    try {
      dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
      const response = await apiForgotPassword(payload);
      dispatch(showModal({ isShowModal: false, modalType: null }));
      if (response.success) {
        Swal.fire(
          'Thành công',
          'Kiểm tra email của bạn',
          'success'
        );

      } else {
        Swal.fire(
          'Lỗi',
          response.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
          'error'
        );
      }
    } catch (error) {
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      Swal.fire(
        'Lỗi',
        'Lỗi trong quá trình xử lý. Vui lòng thử lại sau.',
        'error'
      );
      
    }

    setTimeout(() => {
      setInValidFields([]);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="row justify-content-center py-5">
      <div className="col-lg-6 col-sm-12">
        <div className="login-container">
          <div className="login-container--item d-flex mb-20">
            <div className="login--item-icon">
                  <CiMail />
                </div>
                <div className="login--item-content">
                  <h4 className="login--item-title">Quên mật khẩu</h4>
                  <p>Vui lòng nhập email để lấy lại mật khẩu.</p>
                </div>
              </div>
              <Input
                iconClass={<CiMail />}
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
                invalidFields={invalidFields}
                setInValidFields={setInValidFields}
              />
              <Button
                name="Lấy lại mật khẩu"
                handleOnClick={handleForgotPassword}
              />
              <div style={{cursor: 'pointer'}} className="text-center pt-3">
                <a href={`/${path.LOGIN}`} style={{textDecoration: 'none', color: 'black'}}>Đăng nhập</a>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Forgot;
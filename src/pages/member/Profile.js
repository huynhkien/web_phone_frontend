import { InputForm } from "../../components/index";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import { apiUpdateCurrent } from "../../apis";
import { toast } from "react-toastify";
import {getCurrent} from "../../store/user/asyncActions";

const Profile = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const {  current } = useSelector(state => state.user);

    useEffect(() => {
        if (current) {
          setValue("name", current?.name);
          setValue("email", current?.email);
          setValue("address", current?.address);
          setValue("phone", current?.phone);
        }
      }, [current]);
    const handleUpdate = async (data) => {
            const response = await apiUpdateCurrent(data);
            if (response.success) {
                toast.success(response.updateUser);
                dispatch(getCurrent()); 
            } else {
                toast.error(response.data.updateUser);
            }
    };
    
    return (
        <div style={{width: "500px"}}>
            <div className="user" >
                <div className="orders" >
                    <div className="container">
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <InputForm
                                label='Tên:'
                                placeholder='Tên'
                                register={register}
                                id='name'
                                errors={errors}
                                validate={{ required: 'Thông tin thiếu' }}
                            />
                            <InputForm
                                label='Email:'
                                placeholder='Email'
                                register={register}
                                id='email'
                                errors={errors}
                                validate={{ required: 'Thông tin thiếu' }}
                            />
                            <InputForm
                                label='Địa chỉ:'
                                placeholder='Địa chỉ'
                                register={register}
                                id='address'
                                errors={errors}
                                validate={{ required: 'Thông tin thiếu' }}
                            />
                            <InputForm
                                label='Số điện thoại:'
                                placeholder='Số điện thoại'
                                register={register}
                                id='phone'
                                errors={errors}
                                validate={{
                                    required: 'Thông tin thiếu',
                                    pattern: {
                                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                                        message: 'Số điện thoại không hợp lệ'
                                    }
                                }}
                            />
                            <div className="d-flex gap-2 mb-2 mt-2">
                                <span className="font-text">Trạng thái:</span>
                                <span>{current?.isBlocked ? 'Khóa' : 'Hoạt động'}</span>
                            </div>
                            <div className="d-flex gap-2 mb-2">
                                <span className="font-text">Role:</span>
                                <span>{current?.role === '2004' ? 'User' : 'Admin'}</span>
                            </div>
                            <div className="d-flex gap-2 mb-2">
                                <span className="font-text">Ngày tạo:</span>
                                <span>{moment(current?.createdAt).fromNow()}</span>
                            </div>
                            <div className="d-flex justify-content-center pt-3">
                                <button type="submit" className="btn bg-primary">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
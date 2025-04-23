import { FaCloudUploadAlt } from "react-icons/fa";
import { InputForm, Select, MarkdownEditor } from "../../../components/index";
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { apiCreateProduct, apiGetCategory } from '../../../apis';
import { getBase64, validate } from '../../../utils/helper';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; 
import { showModal } from '../../../store/app/appSlice';
import { cpu, design, gpu, material, os, status, technology_screen, type_product, warranty } from "../../../utils/contant";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [categories, setCategories] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch();


    const fetchCategories = async () => {
        const response = await apiGetCategory(); 
        if(response?.success) setCategories(response?.data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const [payload, setPayload] = useState({
        description: '',
    });

    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    });

    const changeValue = useCallback((e) => {
        setPayload(e);
    }, []);

    const handlePreviewThumb = useCallback(async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    }, []);
    const thumbFile = watch('thumb');
    useEffect(() => {
        if (thumbFile && thumbFile[0]) handlePreviewThumb(thumbFile[0]);
    }, [thumbFile, handlePreviewThumb]);

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.name;
            const finalPayload = {
                ...data,
                ...payload
            };
            
            const formData = new FormData();
            
            for (let i of Object.entries(finalPayload)) {
                if (i[0] !== 'thumb') {
                    formData.append(i[0], i[1]);
                }
            }
            // Xử lý files
            if (finalPayload.thumb) {
                formData.append('thumb', finalPayload.thumb[0]);
            }
            dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
            const response = await apiCreateProduct(formData);
            dispatch(showModal({ isShowModal: false, modalType: null }));
            if (response.success) {
                toast.success(response.message);
                reset();
                setPayload('')
                setPreview({
                    thumb: null,
                });
            } else {
                toast.error(response.message);
            }
        }
    }
    

    return (
        <div>
            <div className="header">
                <div className="left">
                    <h1>Sản phẩm</h1>
                </div>
            </div>
            <div className="bottom-data">
                <div className="orders">
                    <div className="container">
                        <form method="post" action="" onSubmit={handleSubmit(handleCreateProduct)}>
                            <div className="d-flex justify-content-between">
                                <InputForm
                                    label='Tên sản phẩm:'
                                    placeholder='Tên sản phẩm'
                                    register={register}
                                    errors={errors}
                                    id='name'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <InputForm
                                    label='Nguồn gốc:'
                                    placeholder='Nguồn gốc'
                                    register={register}
                                    errors={errors}
                                    id='origin'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Thương hiệu:'
                                    options={categories?.map(el => ({ code: el.name, value: el.name }))}
                                    register={register}
                                    id='category'
                                    name='Thương hiệu'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Tình trạng:'
                                    options={status?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='status'
                                    name='Tình trạng'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />

                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <Select
                                    label='Chất liệu:'
                                    options={material?.map(el => ({ code: el?.code, value: el?.value }))}
                                    register={register}
                                    id='material'
                                    name='Chất liệu sản phẩm'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Thiết kế:'
                                    options={design?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='design'
                                    name='Chọn thiết kế'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Danh mục:'
                                    options={type_product?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='type'
                                    name='Chọn danh mục'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <InputForm
                                    label='Camera trước:'
                                    type="number"
                                    placeholder='Chất lượng camera trước'
                                    register={register}
                                    errors={errors}
                                    id='front_camera'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <InputForm
                                    label='Camera sau:'
                                    type="number"
                                    placeholder='Chất lượng camera sau'
                                    register={register}
                                    errors={errors}
                                    id='rear_camera'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <InputForm
                                    label='Kích thước màn hình:'
                                    placeholder='Kích thước màn hình'
                                    register={register}
                                    errors={errors}
                                    id='size'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <InputForm
                                    label='Trọng lượng:'
                                    placeholder='Trọng lượng sản phẩm'
                                    register={register}
                                    errors={errors}
                                    id='weight'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Công nghệ màn hình:'
                                    options={technology_screen?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='screen_technology'
                                    name='Công nghệ màn hình'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <Select
                                    label='CPU:'
                                    options={cpu?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='cpu'
                                    name='Dung lượng CPU'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='GPU:'
                                    options={gpu?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='gpu'
                                    name='Dung lượng GPU'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <InputForm
                                    label='Dung lượng pin:'
                                    type="number"
                                    placeholder='Dung dung lượng pin:'
                                    register={register}
                                    errors={errors}
                                    id='battery'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <InputForm
                                    label='Hỗ trợ sạc:'
                                    type="number"
                                    placeholder='Hỗ trợ sạc'
                                    register={register}
                                    errors={errors}
                                    id='charger_support'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Hệ điều hành:'
                                    options={os?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='os'
                                    name='Chọn hệ điều hành'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <div className="mt-2">
                                <Select
                                    label='Bảo hành:'
                                    options={warranty?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='warranty'
                                    name='Chọn gói bảo hành'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                            </div>
                            <fieldset className="mt-2">
                                <div className="body-title">Ảnh chính:</div>
                                <div className="upload-image flex-grow mt-2">
                                    <div className="item up-load w-50">
                                        <label className="uploadfile" htmlFor="thumb">
                                            <span className="icon">
                                                <FaCloudUploadAlt color="blue" />
                                            </span>
                                            <span className="body-text">Thêm ảnh chính cho sản phẩm</span>
                                            <input
                                                type='file'
                                                id='thumb'
                                                {...register('thumb', {required: 'Thiếu ảnh'})}
                                            />
                                        </label>
                                        {preview.thumb && <img className='img-upload' src={preview.thumb} alt="Preview" />}
                                    </div>
                                </div>
                            </fieldset>
                            <div className="mt-2">
                                <MarkdownEditor
                                    name='description'
                                    changeValue={changeValue}
                                    label='Mô tả:'
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                />
                            </div>
                            <button type="submit" name="submit" className="btn bg-primary mt-2">Thêm</button>
                        </form>
                    </div>
                </div>
           </div>
        </div>
    )
}
export default AddProduct;

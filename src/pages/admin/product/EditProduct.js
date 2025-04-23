import React, { useCallback, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from 'react-icons/md';
import { InputForm, Select, MarkdownEditor } from "../../../components/index";
import { useForm } from 'react-hook-form';
import { apiGetCategory, apiGetProduct, apiUpdateProduct } from '../../../apis';
import { getBase64, validate } from '../../../utils/helper';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; 
import { showModal } from '../../../store/app/appSlice';
import { cpu, design, gpu, material, os, status, technology_screen, type_product, warranty } from '../../../utils/contant';

const EditProduct = ({updateProduct, setUpdateProduct, fetchProducts}) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [editProduct, setEditProduct] = useState(null);
    const [categories, setCategories] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch(); 

    const [payload, setPayload] = useState({
        description: '',
    });

    const [preview, setPreview] = useState({
        thumb: null,
    });

    const fetchCategories = useCallback(async () => {
        const response = await apiGetCategory(); 
        if(response.success) setCategories(response.data);
    }, []);

    const fetchProduct = useCallback(async () => {
        const response = await apiGetProduct(updateProduct);
        if(response?.success) setEditProduct(response?.data);
    }, [updateProduct]);
    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, [fetchCategories, fetchProduct]);

    useEffect(() => {
        if (editProduct) {
            reset({
                name: editProduct?.name || '',
                category: editProduct?.category || '',
                material: editProduct?.material || '',
                status: editProduct?.status || '',
                origin: editProduct?.origin || '',
                price: editProduct?.price || '',
                type: editProduct?.type || '',
                cpu: editProduct?.cpu || '',
                gpu: editProduct?.gpu || '',
                design: editProduct?.design || '',
                front_camera: editProduct?.front_camera || '',
                rear_camera: editProduct?.rear_camera || '',
                size: editProduct?.size || '',
                weight: editProduct?.weight || '',
                technology_screen: editProduct?.technology_screen || '',
                battery: editProduct?.battery || '',
                charger_support: editProduct?.charger_support || '',
                warranty: editProduct?.warranty || '',
                os: editProduct?.os || '',
                screen_technology: editProduct?.screen_technology || ''
            });
            setPayload({
                description: typeof editProduct?.description === 'object' 
                    ? editProduct?.description?.join('') 
                    : editProduct?.description
            });
            setPreview({
                thumb: editProduct?.thumb?.url || '',
            });
        }
    }, [editProduct, reset]);

    const changeValue = useCallback((e) => {
        setPayload(e);
    }, []);

    const handlePreviewThumb = useCallback(async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview(prev => ({ ...prev, thumb: base64Thumb }));
    }, []);
    
    const thumbFile = watch('thumb');
    useEffect(() => {
        if (thumbFile && thumbFile[0]) handlePreviewThumb(thumbFile[0]);
    }, [thumbFile, handlePreviewThumb]);

    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            const finalPayload = {
                ...data,
                ...payload
            };
            const formData = new FormData();
            console.log({...formData})
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
            const response = await apiUpdateProduct(updateProduct,formData); 
            dispatch(showModal({ isShowModal: false, modalType: null }));
            if (response.success) {
                toast.success(response?.message);
                fetchProducts();
                reset();
                setPayload({
                    description: '',
                });
                setPreview({
                    thumb: null,
                });
                fetchProduct();
            }
        }
    };

    return (
        <div>
            <div className="header">
                <div className='position-absolute top-0 end-0'>
                    <span onClick={() => setUpdateProduct(null)}><MdCancel color='black' fontSize={20}/></span>
                </div>
            </div>
            <div className="bottom-data">
                <div className="orders">
                    <div className="container">
                        <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                                <span className="mx-2"></span>
                                <Select
                                    label='Thương hiệu:'
                                    options={categories?.map(el => ({ code: el.name, value: el.name }))}
                                    register={register}
                                    id='category'
                                    name='Chọn thương hiệu'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <Select
                                    label='Loại:'
                                    options={type_product?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='type'
                                    name='Chọn loại'
                                    errors={errors}
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
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
                                    label='Tình trạng:'
                                    options={status?.map(el => ({ code: el.code, value: el.value }))}
                                    register={register}
                                    id='status'
                                    name='Tình trạng thiết bị'
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
                                                {...register('thumb')}
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
                                    value={payload.description}
                                />
                            </div>
                            <button type="submit" name="submit" className="btn bg-primary mt-2">Cập nhật</button>
                        </form>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default EditProduct
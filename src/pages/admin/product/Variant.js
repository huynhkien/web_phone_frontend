import { FaCloudUploadAlt } from "react-icons/fa";
import { InputForm} from "../../../components/index";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { apiGetProduct, apiCreateVariant, apiDeleteVariant, apiGetVariantId, apiUpdateVariantId } from '../../../apis';
import { formatCurrency, getBase64} from '../../../utils/helper';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdCancel, MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { showModal } from "../../../store/app/appSlice";
import { useDispatch } from "react-redux";

const Variant = ({addVariant, setAddVariant, render}) => {
    const { register, handleSubmit, formState: { errors },  reset } = useForm();
    const [editProduct, setEditProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editVariant, setEditVariant] = useState(null);
    const dispatch = useDispatch();

    
    // State cho nhiều ảnh
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const fetchProduct = async () => {
        const response = await apiGetProduct(addVariant);
        if (response?.success) setEditProduct(response?.data);
        setLoading(false);
    }
    
    useEffect(() => {
        fetchProduct();
    }, []);
    
    // Xử lý tải lên nhiều ảnh
    const handleMultipleImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        const previews = [];
        const validFiles = [];
        
        // Kiểm tra nếu không có file nào được chọn
        if (files.length === 0) return;
        
        // Xóa tất cả ảnh cũ khi tải lên ảnh mới
        setImagePreviews([]);
        setSelectedFiles([]);
        
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
                toast.warning(`File ${file.name} không được hỗ trợ`);
                continue;
            }
            const base64 = await getBase64(file);
            previews.push({ name: file.name, path: base64 });
            validFiles.push(file);
        }
        
        // Lưu trữ chỉ những ảnh mới được chọn
        setImagePreviews(previews);
        setSelectedFiles(validFiles);
    };
    
    
    // Thêm biến thể với nhiều ảnh
    const handleCreateVariant = async (data) => {
        const payload = new FormData();
        payload.append('color', data.color);
        if(editProduct?.type === 'Điện Thoại'){
            payload.append('ram', data.ram);
            payload.append('rom', data.rom);
            payload.append('storage', data.storage);
        }
        payload.append('price', data.price.replace(/,/g, ''));
        
        // Thêm nhiều ảnh
        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach(file => {
                payload.append('images', file);
            });
        console.log({...payload})
        } else {
            toast.warning('Vui lòng chọn ít nhất một ảnh');
            return;
        }
        dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
        const response = await apiCreateVariant(payload, addVariant);
        dispatch(showModal({ isShowModal: false, modalType: null }));

        if(response.success){
            toast.success(response.message);
            fetchProduct();
            reset();
            setImagePreviews([]);
            setSelectedFiles([]);
        } else {
            toast.error(response.message);
        }
    };
    
    // Xóa biến thể
    const handleDelete = async (productId, variantId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa biến thể này?')) {
            const response = await apiDeleteVariant(productId, variantId);
            
            if (response.success) {
                toast.success(response.message);
                fetchProduct(); 
            } else {
                toast.error(response.message);
            }
        }
    };
    
    // Lấy dữ liệu biến thể để cập nhật
    useEffect(() => {
        const fetchVariantData = async () => {
            if (editVariant) {
                const response = await apiGetVariantId(addVariant, editVariant);
                if (response.success) {
                    reset({
                        color: response?.data?.color,
                        ram: response?.data?.ram,
                        rom: response?.data?.rom,
                        storage: response?.data?.storage,
                        price: response?.data?.price,
                    });
                    
                    if (response?.data?.images && response?.data?.images.length > 0) {
                        const images = response.data.images.map(img => ({
                            name: img.name || 'image.jpg',
                            path: img.url
                        }));
                        setImagePreviews(images);
                    } else {
                        setImagePreviews([]);
                    }
                    setSelectedFiles([]);
                }
            }
        };
        fetchVariantData();
    }, [addVariant, editVariant, reset]);
    
    // Cập nhật biến thể
    const handleUpdate = async(data) => {
        const payload = new FormData();
        payload.append('color', data.color);
        if(editProduct?.type === 'Điện Thoại'){
            payload.append('ram', data.ram);
            payload.append('rom', data.rom);
            payload.append('storage', data.storage);
        }
        payload.append('price', data.price.toString().replace(/\./g, ''));
        
        // Thêm nhiều ảnh cho cập nhật
        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach(file => {
                payload.append('images', file);
            });
        }
        console.log(selectedFiles)
        dispatch(showModal({ isShowModal: true, modalType: 'loading' }));
    
        const response = await apiUpdateVariantId(addVariant, editVariant, payload);
        
        // Hide loading indicator
        dispatch(showModal({ isShowModal: false, modalType: null }));
        if(response.success) {
            toast.success(response.message);
            fetchProduct();
            setEditVariant(null);
            setImagePreviews([]);
            setSelectedFiles([]);
        } else {
            toast.error(response.message);
        }
    };
    
    // Hiển thị ảnh trong bảng
    const imageBodyTemplate = (rowData) => {
        if (rowData?.images && rowData.images.length > 0) {
            return <img src={rowData.images[0].url} alt={rowData?.color} width={50} height={50} />;
        }
        return <div>Không có ảnh</div>;
    };
    
   
    
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex align-items-center justify-content-center">
                {editVariant === rowData?._id ? (
                    <div className="d-flex align-items-center position-relative">
                        <span className="text-primary me-2">
                            <IoIosAddCircleOutline/>
                        </span>
                        <span className='icon-edit-receipt' onClick={() => {
                            setEditVariant(null);
                            reset();
                            setImagePreviews([]);
                            setSelectedFiles([]);
                        }}>
                            <MdCancel />
                        </span>
                    </div>
                ) : (
                    <span 
                        onClick={() => setEditVariant(rowData?._id)}
                        className="text-primary me-2"
                    >
                        <FaEdit/>
                    </span>
                )}
                <span 
                    onClick={() => handleDelete(addVariant, rowData?._id)} 
                    className="text-danger"
                >
                    <FaTrash/>
                </span>
            </div>
        );
    };
    
    const header = (
        <div className="p-inputgroup flex-1 my-2">
            <InputText type="text" placeholder="Tìm kiếm" className="p-inputtext p-component p-2" onChange={(e) => setGlobalFilter(e.target.value)} />
        </div>
    );
    
    return (
        <div>
            <div className='position-absolute top-0 end-0'>
                <span onClick={() => setAddVariant(null)}><MdCancel color='primary' fontSize={25}/></span>
            </div>
            <div className="bottom-data">
                <div className="orders">
                    <div className="container">
                        {editProduct &&
                        <input
                          className="form-control my-2"
                          value={editProduct?.name}
                          readOnly
                        />
                        }
                        <form method="post" action="" onSubmit={editVariant ? handleSubmit(handleUpdate) : handleSubmit(handleCreateVariant)}>
                            <div className="d-flex justify-content-between">
                                <InputForm
                                    label='Màu sắc:'
                                    placeholder='Tên màu'
                                    register={register}
                                    errors={errors}
                                    id='color'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                {editProduct?.type === 'Điện Thoại' &&
                                <>
                                <span className="mx-2"></span>
                                <InputForm
                                    label='Ram:'
                                    placeholder='Ram'
                                    type='number'
                                    register={register}
                                    errors={errors}
                                    id='ram'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                <InputForm
                                    label='Rom:'
                                    placeholder='Rom'
                                    register={register}
                                    errors={errors}
                                    id='rom'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                </>
                                }
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                {editProduct?.type === 'Điện Thoại' &&
                                <>
                                <InputForm
                                    label='Dung lượng:'
                                    placeholder='Dung lượng'
                                    register={register}
                                    errors={errors}
                                    id='storage'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                />
                                <span className="mx-2"></span>
                                </>
                                }
                                
                                <InputForm
                                    label='Giá:'
                                    placeholder='Giá'
                                    register={register}
                                    errors={errors}
                                    id='price'
                                    validate={{
                                        required: 'Thông tin thiếu'
                                    }}
                                    onChange={(e) => {
                                        const formatted = formatCurrency(e.target.value);
                                        e.target.value = formatted;
                                      }}
                                />
                            </div>
                            <fieldset className="mt-3">
                                <div className="body-title">Tải nhiều ảnh:</div>
                                <div className="upload-image flex-grow mt-2">
                                    <div className="item up-load w-100">
                                        <label className="uploadfile" htmlFor="images">
                                            <span className="icon">
                                                <FaCloudUploadAlt color="blue" />
                                            </span>
                                            <span className="body-text">Thêm nhiều ảnh cho biến thể</span>
                                            <input
                                                type='file'
                                                id='images'
                                                multiple
                                                onChange={handleMultipleImagesChange}
                                            />
                                        </label>
                                        
                                        {imagePreviews.length > 0 && (
                                            <div className="d-flex flex-wrap mt-3">
                                                {imagePreviews.map((image, index) => (
                                                    <div key={index} className="position-relative me-2 mb-2">
                                                        <img 
                                                            src={image.path} 
                                                            alt={image.name} 
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </fieldset>
                            <button type="submit" name="submit" className="btn bg-primary mt-3">
                                {editVariant ? 'Cập nhật' : 'Thêm biến thể'}
                            </button>
                        </form>
                    </div>
                </div>
           </div>
           <div className="bottom-data">
                <div className="orders">
                    <DataTable
                        value={editProduct?.variants}  
                        paginator
                        rows={10}
                        dataKey="_id" 
                        loading={loading}
                        emptyMessage="Không có biến thể."
                        header={header}
                        globalFilter={globalFilter}
                    >
                        <Column sortable field="sku" header="Mã" />
                        <Column sortable field="color" header="Màu sắc" />
                        {editProduct?.type === 'Điện Thoại' &&
                        <>
                            <Column sortable field="ram" header="Ram" />
                            <Column sortable field="rom" header="Rom" />
                            <Column sortable field="storage" header="Dung lượng" />
                        </>
                        }
                        <Column sortable field="price" header="Giá" />
                        <Column body={imageBodyTemplate} header="Ảnh đại diện" />
                        <Column body={actionBodyTemplate} header="Thao tác" />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Variant;
import React, { useCallback, useEffect, useState } from 'react';
import { CiStar } from "react-icons/ci";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';

// css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useParams} from 'react-router-dom';
import { apiGetProductBySlug, apiGetQuantityWareHouse } from '../../apis';
import withBaseComponents from '../../hocs/withBaseComponents';
import { addToCart } from '../../store/user/userSlice';
import Swal from 'sweetalert2';
import { Quantity, TabInfo } from '../../components';
import { cpu, gpu, design, warranty } from '../../utils/contant';
import { renderStartFromNumber } from '../../utils/helper';
const ProductDetail = ({ navigate, dispatch }) => {

    const { slug } = useParams();
    
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState({
        color: null,
        ram: null,
        rom: null,
        sku: null,
    });
    const [quantity, setQuantity] = useState(1);
    const [currentProduct, setCurrentProduct] = useState({});
    const [quantityProduct, setQuantityProduct] = useState(null);
    useEffect(() => {
        const fetchProductWareHouse = async () => {
            if (product?._id && selectedVariant?.sku) {
                const response = await apiGetQuantityWareHouse(product._id, selectedVariant.sku);
                console.log("Fetching data for SKU:", selectedVariant.sku);
                
                if (response.success && response.data) {
                    setQuantityProduct(response.data);
                    console.log("Warehouse data saved:", response.data);
                } else {
                    console.log("Product not found in warehouse or request failed");
                    setQuantityProduct(null); 
                }
            }
        };
        
        fetchProductWareHouse();
    }, [product?._id, selectedVariant?.sku]);
    
    const fetchProductBySlug = async () => {
        const response = await apiGetProductBySlug(slug);
        if (response.success) {
            setProduct(response?.data);
            if (response?.data?.variants?.length > 0) {
                const firstVariant = response.data.variants[0];
                setSelectedVariant({
                    color: firstVariant.color,
                    ram: firstVariant.ram,
                    rom: firstVariant.rom,
                    sku: firstVariant.sku,
                });
            }
        }
    };
    useEffect(() => {
        fetchProductBySlug();
    }, [slug]);
    
    const getAvailableColors = () => {
        if (!product || !product.variants) return [];
        return [...new Map(product.variants.map(item => [item.color, item])).values()]
            .map(variant => variant.color);
    };

    const getAvailableRam = () => {
        if (!product || !product.variants || !selectedVariant.color) return [];
        const filteredVariants = product.variants.filter(v => v.color === selectedVariant.color);
        return [...new Map(filteredVariants.map(item => [item.ram, item])).values()]
            .map(variant => variant.ram)
            .filter(Boolean); 
    };

    const getAvailableRom = () => {
        if (!product || !product.variants || !selectedVariant.color || !selectedVariant.ram) return [];
        const filteredVariants = product.variants.filter(
            v => v.color === selectedVariant.color && v.ram === selectedVariant.ram
        );
        return [...new Map(filteredVariants.map(item => [item.rom, item])).values()]
            .map(variant => variant.rom)
            .filter(Boolean);
    };

    const handleSelectColor = (color) => {
        const matchingVariants = product.variants.filter(v => v.color === color);
        const firstMatchingVariant = matchingVariants[0];
        
        setSelectedVariant({
            color: color,
            ram: firstMatchingVariant.ram || null,
            rom: firstMatchingVariant.rom || null,
            sku: firstMatchingVariant.sku
        });
    };

    const handleSelectRam = (ram) => {
        const matchingVariants = product.variants.filter(
            v => v.color === selectedVariant.color && v.ram === ram
        );
        const firstMatchingVariant = matchingVariants[0];
        
        setSelectedVariant({
            ...selectedVariant,
            ram: ram,
            rom: firstMatchingVariant.rom || null,
            sku: firstMatchingVariant.sku
        });
    };

    const handleSelectRom = (rom) => {
        const matchingVariant = product.variants.find(
            v => v.color === selectedVariant.color && 
                 v.ram === selectedVariant.ram && 
                 v.rom === rom
        );
        
        if (matchingVariant) {
            setSelectedVariant({
                ...selectedVariant,
                rom: rom,
                sku: matchingVariant.sku
            });
        }
    };
    useEffect(() => {
        if (!product || !selectedVariant.sku) return;
        
        const variant = product.variants.find(v => v.sku === selectedVariant.sku);
        if (variant) {
            setCurrentProduct({
                price: variant.price,
                thumb: variant.images[0]?.url || product.thumb?.url,
                quantity: variant.quantity,
                sku: variant.sku
            });
        }
    }, [selectedVariant, product]);

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return;
        } else {
            setQuantity(number);
        }
    }, []);

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return;
        if (flag === 'minus') setQuantity(prev => +prev - 1);
        if (flag === 'plus') setQuantity(prev => +prev + 1);
    }, [quantity]);

    const handleAddCart = () => {
        // Kiểm tra nếu không có thông tin số lượng sản phẩm trong kho
        if (!quantityProduct) {
            Swal.fire({
                title: 'Không thể xác định số lượng sản phẩm trong kho',
                text: 'Xin vui lòng thử lại sau!',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Kiểm tra nếu sản phẩm hết hàng (số lượng <= 0)
        if (quantityProduct?.sku === selectedVariant?.sku && quantityProduct?.totalQuantity <= 0) {
            Swal.fire({
                title: 'Sản phẩm đã hết hàng trong kho',
                text: 'Xin vui lòng chọn sản phẩm khác!',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Kiểm tra nếu số lượng đặt hàng vượt quá số lượng trong kho
        if (quantityProduct?.sku === selectedVariant?.sku && quantity > quantityProduct?.totalQuantity) {
            Swal.fire({
                title: 'Số lượng sản phẩm bạn đặt vượt quá số lượng sản phẩm trong kho',
                text: `Số lượng tồn kho hiện tại: ${quantityProduct?.totalQuantity}. Vui lòng chọn lại số lượng!`,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Nếu đã qua tất cả điều kiện kiểm tra, thêm vào giỏ hàng
        dispatch(addToCart({
            pid: product?._id,
            sku: selectedVariant.sku,
            color: selectedVariant.color,
            ram: selectedVariant.ram,
            rom: selectedVariant.rom,
            category: product.category,
            quantity,
            thumb_variant: currentProduct.thumb,
            price: currentProduct?.price,
            name: product.name,
            type: product.type
        }));
        
        toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
    }
    // Hàm get giá trị
    const getCpuName = (cpuCode) => {
        const cpuItem = cpu.find(item => item.code === cpuCode);
        return cpuItem ? cpuItem.value : cpuCode;
    };
    const getGpuName = (gpuCode) => {
        const gpuItem = gpu.find(item => item.code === gpuCode);
        return gpuItem ? gpuItem.value : gpuCode;
    };
    const getDesign = (designCode) => {
        const designItem = design.find(item => item.code === designCode);
        return designItem? designItem.value : designCode;
    };
    const getWarranty = (warrantyCode) => {
        const designItem = warranty.find(item => item.code === warrantyCode);
        return designItem? designItem.value : warrantyCode;
    };
    return (
        <div className="product-details-area pt-100px pb-100px">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
                        <div>
                            <img 
                                src={selectedImage ? selectedImage : product?.thumb?.url} 
                                alt={product?.name} 
                                style={{width: "40vw", height:"40vw", borderRadius: "10px"}}
                            />
                        </div>
                        <Swiper
                            navigation
                            slidesPerView={2}
                            modules={[Navigation]}
                            style={{paddingTop: "10px"}}
                        >
                            {product?.variants?.map((el, index) => (
                                <SwiperSlide key={index} style={{margin: "5px"}} className='text-center'>
                                    <img 
                                        src={el?.images?.[0]?.url} 
                                        onClick={() => setSelectedImage(el?.images?.[0]?.url)}
                                        alt="images"
                                        style={{
                                            width: "10vw", 
                                            height: "8vw",
                                            cursor: "pointer",
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-delay="200">
                        <div className="product-details-content quickview-content ml-25px">
                            <h2>{product?.name}</h2>
                            <div className="pricing-meta">
                                <ul className="d-flex">
                                    <li className="new-price">
                                        {currentProduct?.price ? currentProduct.price.toLocaleString() : product?.variants?.[0]?.price?.toLocaleString()} VNĐ
                                    </li>
                                </ul>
                            </div>
                            <div className="pro-details-rating-wrap">
                            {renderStartFromNumber(product?.totalRatings)?.map((el, index) => (
                                                    <span key={index}>{el}</span>
                                                ))}
                            </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>SKU:</span>
                                <ul className="d-flex">
                                    <li>
                                        <a href={`/detail/${slug}`}>{currentProduct?.sku || product?.variants?.[0]?.sku}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>Danh mục: </span>
                                <ul className="d-flex">
                                    <li>
                                        <a href={`/categories/${product?.category}`}>{product?.category}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>Nguồn gốc: </span>
                                <ul className="d-flex">
                                    <li>
                                        <a>{product?.origin}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>Tình trạng: </span>
                                <ul className="d-flex">
                                    <li>
                                        <a>{product?.status}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Thiết kế: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{getDesign(product?.design)}</a>
                                            </li>
                                        </ul>
                                    </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Chất liệu: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{getDesign(product?.material)}</a>
                                            </li>
                                        </ul>
                                    </div>
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Trọng lượng: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{getDesign(product?.weight)} gram</a>
                                            </li>
                                        </ul>
                                    </div>
                            {
                                product?.type === "Điện Thoại" && (
                                    <>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Kích thước màn hình: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{product?.size} inch</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Hệ điều hành: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{product?.os}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>CPU: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{getCpuName(product?.cpu)}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>GPU: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{getGpuName(product?.gpu)}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Camera trước: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{product?.front_camera} MP</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Camera sau: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{product?.rear_camera} MP</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Dung lượng pin: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{product?.battery} mAh</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Nguồn sạc: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{product?.charger_support} W</a>
                                            </li>
                                        </ul>
                                    </div>
                                    </>
                                )
                            }
                            <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                                        <span>Bảo hành: </span>
                                        <ul className="d-flex">
                                            <li>
                                                <a>{getWarranty(product?.warranty)} </a>
                                            </li>
                                        </ul>
                                    </div>
                            <div className="mb-3">
                                <span style={{color: "#266bf9", paddingBottom: "5px", display: "block"}}>Màu sắc: </span>
                                <div className="d-flex flex-wrap gap-2">
                                    {getAvailableColors().map((color, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelectColor(color)}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: selectedVariant.color === color ? "#266bf9" : "white",
                                                color: selectedVariant.color === color ? "white" : "black"
                                            }}
                                            className="rounded shadow-sm p-2 text-center" 
                                        >
                                            <span>{color}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {getAvailableRam().length > 0 && (
                                <div className="mb-3">
                                    <span style={{color: "#266bf9", paddingBottom: "5px", display: "block"}}>RAM: </span>
                                    <div className="d-flex flex-wrap gap-2">
                                        {getAvailableRam().map((ram, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelectRam(ram)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedVariant.ram === ram ? "#266bf9" : "white",
                                                    color: selectedVariant.ram === ram ? "white" : "black"
                                                }}
                                                className="rounded shadow-sm p-2 text-center"
                                            >
                                                <span>{ram}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {getAvailableRom().length > 0 && (
                                <div className="mb-3">
                                    <span style={{color: "#266bf9", paddingBottom: "5px", display: "block"}}>ROM: </span>
                                    <div className="d-flex flex-wrap gap-2">
                                        {getAvailableRom().map((rom, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelectRom(rom)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedVariant.rom === rom ? "#266bf9" : "white",
                                                    color: selectedVariant.rom === rom ? "white" : "black"
                                                }}
                                                className="rounded shadow-sm p-2 text-center"
                                            >
                                                <span>{rom}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="pro-details-quality">
                                <Quantity
                                    quantity={quantity}
                                    handleQuantity={handleQuantity}
                                    handleChangeQuantity={handleChangeQuantity}
                                />
                                <div className="pro-details-cart">
                                    <button 
                                        className="add-cart" 
                                        onClick={handleAddCart}
                                       
                                    >
                                        Thêm sản phẩm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <TabInfo
                            description={product?.description}
                            total={product?.totalRatings}
                            ratings={product?.ratings}
                            nameProduct={product?.name}
                            pid={product?._id}
                            setProduct={fetchProductBySlug}
                        />
                </div>
            </div>
        </div>
    );
};

export default withBaseComponents(ProductDetail);
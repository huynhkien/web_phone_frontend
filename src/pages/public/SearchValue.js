import React, { useCallback, useEffect, useState } from 'react'
import { FilterPrice, Pagination, Product, Sort } from '../../components'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiGetCategory, apiGetProducts } from '../../apis';
import { sorts } from '../../utils/contant';

const SearchValue = () => {
    const [products, setProducts] = useState([]);
    const [activeClick, setActiveClick] = useState(null);
    const [categories, setCategories] = useState(null);
    const [params] = useSearchParams();
    const [sort, setSort] = useState('');
    const navigate = useNavigate();
    const { search} = useParams();
    console.log(search);
    const fetchCategories = async () => {
      const response = await apiGetCategory();
      if(response?.success) setCategories(response?.data)
    }
    useEffect(() => {
        fetchCategories();
      },[])
    const fetchProductsByCategory = async(queries) => {
      const response = await apiGetProducts({q: search, ...queries, limit: 6});
      if(response?.success) setProducts(response);
      console.log(products.data)
    } 
    
    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        let priceQuery = {};
        
        if(queries.from && queries.to) {
          priceQuery = {
            $and: [
              {'variants.0.price': {gte: queries.from}},
              {'variants.0.price': {lte: queries.to}}
            ]
          };
          delete queries.price;
        } else {
          if(queries.from) queries['variants.0.price'] = {gte: queries.from};
          if(queries.to) queries['variants.0.price'] = {lte: queries.to};
        }
        
        delete queries.to;
        delete queries.from;
        
        const q = {...priceQuery, ...queries};
        console.log('Query:', q);
    
        fetchProductsByCategory(q);
        
      }, [params, search]);

    const changeActiveFilter = useCallback((name) => {
      if(activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    }, [activeClick]);

    const changeValue = useCallback((value) => {
      setSort(value);
    }, []);

    useEffect(() => {
      if(sort){
        navigate({
          pathname: `/product/${search}`,
          search: createSearchParams({sort}).toString()
        });
      }
    }, [sort, search, navigate]);

  return (
    <div className="shop-category-area pt-100px pb-100px">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 order-lg-last col-md-12 order-md-first">
                        {/* Sort */}
                        <Sort
                            value={sort} 
                            options={sorts} 
                            changeValue={changeValue}
                            counts={products?.counts}
                        />
                        <div className="shop-bottom-area">
                            <div className="row">
                                <div className="col">
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="shop-grid">
                                            <div className="row mb-n-30px">
                                              {products?.counts > 0 ? (
                                                   products?.data.map((el, index) => (
                                                       <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-30px" key={el._id || index}>
                                                           <Product
                                                               data={{
                                                                   thumb: el?.thumb?.url,
                                                                   thumb_variant: el?.variants[0]?.images[0]?.url,
                                                                   name: el?.name,
                                                                   category: el?.category,
                                                                   price: el?.variants[0]?.price,
                                                                   slug: el?.slug
                                                               }}
                                                           />
                                                       </div>
                                                   ))
                                               ) : (
                                                   <div className="col-12 text-center py-5">
                                                       <p>Không có sản phẩm</p>
                                                   </div>
                                               )}  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Pagination */}
                            <Pagination
                                totalCount={products?.counts}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 order-lg-first col-md-12 order-md-last">
                        <div className="shop-sidebar-wrap">
                            <div className="sidebar-widget">
                                <h4 className="sidebar-title">Thương hiệu</h4>
                                <div className="sidebar-widget-category">
                                    <ul>
                                        {categories?.map((el, index) => (
                                            <li key={index}><a href={`/categories/${el?.name}`} className=""> {el?.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="sidebar-widget mt-8">
                                <h4 className="sidebar-title">Lọc theo giá</h4>
                                {/* Lọc theo giá */}
                                <FilterPrice
                                    name='Giá'
                                    changeActiveFilter={changeActiveFilter}
                                    activeClick={activeClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SearchValue
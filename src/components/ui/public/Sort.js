import React, { memo } from 'react';

const Sort = ({ value, changeValue, options, counts }) => {
  return (
    <div class="shop-top-bar d-flex">
      <p class="compare-product"> <span>{counts}</span> sản phẩm</p>
          <select
            className="select-shoing-wrap d-flex align-items-center"
            value={value}
            onChange={e => changeValue(e.target.value)}
          >
            <option>Sắp xếp</option>
            {options?.map(el => (
              <option key={el.id} value={el.value}>{el.text}</option>
            ))}
          </select>
    </div>
  );
};

export default memo(Sort);

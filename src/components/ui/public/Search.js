import { useNavigate } from 'react-router-dom'; 
import { memo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/product/${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit"><i><CiSearch/></i></button>
    </form>
  );
};

export default memo(Search);
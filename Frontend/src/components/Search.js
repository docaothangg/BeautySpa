import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiSearchProduct } from '../APIs/ProductsApi';
import { apiSearchService } from '../APIs/ServiceAPI';

const Search = () => {
    const location = useLocation();
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q'); // Lấy từ khóa từ URL
        if (query) {
            setKeyword(query);
            handleSearch(query);
        }
    }, [location.search]);

    const handleSearch = async (searchKeyword) => {
        setLoading(true);
        setError(null);

        try {
            // Gọi API tìm kiếm sản phẩm
            const productResults = await apiSearchProduct(searchKeyword);
            setProducts(productResults);

            // Gọi API tìm kiếm dịch vụ
            const serviceResults = await apiSearchService(searchKeyword);
            setServices(serviceResults);
        } catch (err) {
            setError('Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2>Kết quả tìm kiếm cho: "{keyword}"</h2>

            {loading && <p>Đang tìm kiếm...</p>}
            {error && <p className="error">{error}</p>}

            {/* Kết quả tìm kiếm sản phẩm */}
            <div className="search-results">
                <h3>Sản phẩm</h3>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                {product.name} - {product.price}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không tìm thấy sản phẩm nào.</p>
                )}

                {/* Kết quả tìm kiếm dịch vụ */}
                <h3>Dịch vụ</h3>
                {services.length > 0 ? (
                    <ul>
                        {services.map((service) => (
                            <li key={service.id}>
                                {service.name} - {service.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không tìm thấy dịch vụ nào.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
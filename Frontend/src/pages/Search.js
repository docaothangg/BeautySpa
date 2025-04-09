import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Search = () => {
    const { t } = useTranslation(); // Hỗ trợ đa ngôn ngữ
    const { state } = useLocation(); // Lấy dữ liệu từ Search.js
    const navigate = useNavigate();
    const results = state?.results || []; // Kết quả tìm kiếm
    const keyword = state?.keyword || ''; // Từ khóa tìm kiếm

    // Hàm quay lại trang trước
    const handleBack = () => {
        navigate(-1);
    };

    // Hàm điều hướng đến trang chi tiết
    const handleViewDetails = (item) => {
        const path = item.type === 'product' ? `/product/${item.id}` : `/service/${item.id}`;
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-20 pb-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Tiêu đề và nút quay lại */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                        {keyword
                            ? `${t('search.resultsFor')} "${keyword}"`
                            : t('search.results')}
                        <span className="text-sm text-gray-500 ml-2">
                            ({results.length} {t('search.itemsFound')})
                        </span>
                    </h1>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {t('search.back')}
                    </button>
                </div>

                {/* Danh sách kết quả */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                                onClick={() => handleViewDetails(item)}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 truncate">
                                    {item.name || item.title || t('search.noTitle')}
                                </h2>
                                <p className="text-gray-600 mt-1 line-clamp-2">
                                    {item.description || t('search.noDescription')}
                                </p>
                                {item.price && (
                                    <p className="text-blue-500 font-medium mt-2">
                                        {t('search.price')}: {item.price.toLocaleString('vi-VN')} VND
                                    </p>
                                )}
                                <button
                                    className="mt-3 text-sm text-blue-500 hover:underline"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Ngăn click trên card kích hoạt
                                        handleViewDetails(item);
                                    }}
                                >
                                    {t('search.viewDetails')}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">{t('search.noResults')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
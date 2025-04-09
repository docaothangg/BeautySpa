import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api/';
const product = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getProducts = async () => {
    const res = await product.get('product/list');
    return res.data;
};

export const addProduct = async (productData) => {
    const res = await product.post('product/add', productData);
    return res.data;
};

export const getProductById = async (id) => {
    const res = await product.get(`product/${id}`);
    return res.data;
};

export const updateProduct = async (id, productData) => {
    const res = await product.put('product/update', { id, ...productData });
    return res.data;
};

// export const apiSearchProduct = async (keyword) => {
//     try {
//         const res = await product.get('product/search', {
//             params: { q: keyword }, // Truyền từ khóa qua query parameter
//         });
//         return res.data; // Trả về dữ liệu từ API (giả định có thuộc tính data)
//     } catch (error) {
//         console.error('Error fetching product search results:', error);
//         throw error; // Ném lỗi để xử lý ở Search.js
//     }
// };
export const apiSearchProduct = async (keyword) => {
    try {
        const res = await product.get('product/search', {
            params: { q: keyword }, // Truyền từ khóa qua query parameter
        });
        return res.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching product search results:', error);
        throw error; // Ném lỗi để xử lý ở Search.js
    }
};
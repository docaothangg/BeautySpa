import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api/';

const service = axios.create({
        baseURL: API_BASE_URL,
        headers: {
                'Content-Type': 'application/json',
        }
});

export const getAllServices = async () => {
        const response = await service.get('service/list');
        return response.data;
};

export const getServiceById = async (id) => {
        const response = await service.get(`service/${id}`);
        return response.data;
};

export const createService = async (serviceData) => {
        const response = await service.post('service/add', serviceData);
        return response.data;
};

export const updateService = async (id, serviceData) => {
        const res = await service.put('service/update', { id, ...serviceData });
        return res.data;
};

export const deleteService = async (id) => {
        const response = await service.delete(`service/delete/${id}`);
        return response.data;
};

// export const apiSearchService = async (keyword) => {
//         try {
//                 const response = await service.get('service/search', {
//                         params: { q: keyword }, // Truyền từ khóa qua query parameter
//                 });
//                 return response.data; // Trả về dữ liệu từ API (giả định có thuộc tính data)
//         } catch (error) {
//                 console.error('Error fetching service search results:', error);
//                 throw error; // Ném lỗi để xử lý ở Search.js
//         }
// };

export const apiSearchService = async (keyword) => {
        try {
                const response = await service.get('service/search', {
                        params: { q: keyword }, // Truyền từ khóa qua query parameter
                });
                return response.data; // Trả về dữ liệu từ API
        } catch (error) {
                console.error('Error fetching service search results:', error);
                throw error; // Ném lỗi để xử lý ở Search.js
        }
};
import Service from '../models/serviceModel.js'

// Create a new service
const createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json({ success: true, message: 'Thêm dịch vụ thành công', data: newService })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Thêm dịch vụ thất bại', error: error.message })
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json({ success: true, data: services })
    } catch (error) {
        res.status(500).json({ message: 'Lỗi load dịch vụ', error: error.message });
    }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Không tìm thấy dịch vụ' });
        }
        res.status(200).json({ message: 'Lấy dịch vụ thành công', service });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi load dịch vụ', error: error.message });
    }
};

// Update a service
const updateService = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const updatedService = await ServiceModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedService) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.status(200).json({ success: true, data: updatedService });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error updating service' });
    }
};



// Delete a service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Không tìm thấy dịch vụ' });
        }

        res.status(200).json({ message: 'Xóa dịch vụ thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Xóa dịch vụ thất bại', error: error.message });
    }
};
// Search services by name
const searchServices = async (req, res) => {
    const { q } = req.query; // Lấy từ khóa từ query parameter
    try {
        const services = await ServiceModel.find({
            name: { $regex: q, $options: 'i' } // Tìm kiếm không phân biệt hoa thường
        });
        res.json({ success: true, data: services });
    } catch (error) {
        console.error('Error searching services:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi tìm kiếm dịch vụ' });
    }
};
export {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    searchServices
};
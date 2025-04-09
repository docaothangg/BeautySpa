import axios from 'axios';

const PAYPAL_API_URL = process.env.PAYPAL_API_URL;
const MMO_API_URL = process.env.MMO_API_URL;
const VISA_API_URL = process.env.VISA_API_URL;

const processPayPalPayment = async (paymentDetails) => {
    try {
        const response = await axios.post(`${PAYPAL_API_URL}/payments`, paymentDetails);
        return response.data;
    } catch (error) {
        throw new Error('PayPal payment processing failed: ' + error.message);
    }
};

const processMMOPayment = async (paymentDetails) => {
    try {
        const response = await axios.post(`${MMO_API_URL}/payments`, paymentDetails);
        return response.data;
    } catch (error) {
        throw new Error('MMO payment processing failed: ' + error.message);
    }
};

const processVisaPayment = async (paymentDetails) => {
    try {
        const response = await axios.post(`${VISA_API_URL}/payments`, paymentDetails);
        return response.data;
    } catch (error) {
        throw new Error('Visa payment processing failed: ' + error.message);
    }
};

export default {

    processPayPalPayment,
    processMMOPayment,
    processVisaPayment,
};
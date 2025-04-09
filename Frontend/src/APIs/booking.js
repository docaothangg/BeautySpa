const API_URL = "http://localhost:5000/api/bookings"; // Replace with your backend URL

export const createBooking = async (bookingDetails) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingDetails),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to create booking");
        }
        return data;
    } catch (error) {
        throw error;
    }
};
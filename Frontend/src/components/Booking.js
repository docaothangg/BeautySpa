import React, { useState } from "react";
import { DatePicker, TimePicker, Select, Button, Input, message } from "antd";
import moment from "moment";
import { createBooking } from "../APIs/booking";

const { Option } = Select;

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = async () => {
    if (!selectedService || !selectedBranch || !selectedDate || !selectedTime || !paymentMethod || !email || !phone) {
      message.error("Please fill in all fields.");
      return;
    }

    const bookingDetails = {
      serviceId: selectedService,
      branchId: selectedBranch,
      bookingDate: selectedDate.format("YYYY-MM-DD"),
      bookingTime: selectedTime.format("HH:mm"),
      paymentMethod,
      email,
      phone,
    };

    try {
      const response = await createBooking(bookingDetails);
      message.success("Booking submitted successfully! Check your email for confirmation.");
      console.log("Booking Response:", response);
    } catch (error) {
      message.error(error.message || "Failed to submit booking.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Book a Service</h2>

      {/* Service Selection */}
      <label className="block mb-2 font-medium">Select Service</label>
      <Select
        placeholder="Choose a service"
        className="w-full mb-4"
        onChange={(value) => setSelectedService(value)}
      >
        <Option value="massage">Massage</Option>
        <Option value="facial">Facial</Option>
        <Option value="spa">Spa</Option>
      </Select>

      {/* Branch Selection */}
      <label className="block mb-2 font-medium">Select Branch</label>
      <Select
        placeholder="Choose a branch"
        className="w-full mb-4"
        onChange={(value) => setSelectedBranch(value)}
      >
        <Option value="branch1">Branch 1</Option>
        <Option value="branch2">Branch 2</Option>
        <Option value="branch3">Branch 3</Option>
      </Select>

      {/* Date Selection */}
      <label className="block mb-2 font-medium">Select Date</label>
      <DatePicker
        className="w-full mb-4"
        onChange={(date) => setSelectedDate(date)}
        disabledDate={(current) => current && current < moment().endOf("day")}
      />

      {/* Time Selection */}
      <label className="block mb-2 font-medium">Select Time</label>
      <TimePicker
        className="w-full mb-4"
        onChange={(time) => setSelectedTime(time)}
        format="HH:mm"
      />

      {/* Payment Method */}
      <label className="block mb-2 font-medium">Payment Method</label>
      <Select
        placeholder="Choose a payment method"
        className="w-full mb-4"
        onChange={(value) => setPaymentMethod(value)}
      >
        <Option value="paypal">PayPal</Option>
        <Option value="mmo">MMO</Option>
        <Option value="visa">Visa</Option>
      </Select>

      {/* Contact Information */}
      <label className="block mb-2 font-medium">Email</label>
      <Input
        type="email"
        placeholder="Enter your email"
        className="w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block mb-2 font-medium">Phone</label>
      <Input
        type="text"
        placeholder="Enter your phone number"
        className="w-full mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* Submit Button */}
      <Button type="primary" className="w-full" onClick={handleBooking}>
        Book Now
      </Button>
    </div>
  );
};

export default Booking;
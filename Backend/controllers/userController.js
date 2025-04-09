import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET chưa được định nghĩa trong file .env");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email không hợp lệ" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email đã tồn tại" });
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Tạo token JWT
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "Đăng ký thành công! Kiểm tra email để kích hoạt tài khoản.",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error });
  }
};
//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// quên  mk
// Tạo mã xác nhận (OTP)
const generateVerificationCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const sendVerificationCode = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Bạn có thể thay đổi dịch vụ gửi email
    auth: {
      user: process.env.EMAIL_USER, // Địa chỉ email của bạn
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng của bạn
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mã xác nhận quên mật khẩu",
    text: `Mã xác nhận của bạn là: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

// Quên mật khẩu - Gửi mã xác nhận qua email
const quenmk = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Email không tồn tại trong hệ thống",
      });
    }

    // Tạo mã xác nhận và gửi qua email
    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    await user.save();

    await sendVerificationCode(email, verificationCode);

    res.json({
      success: true,
      message: "Mã xác nhận đã được gửi đến email của bạn.",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    });
  }
};

const verifyCodeAndResetPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Email không tồn tại trong hệ thống",
      });
    }
    if (
      !user.verificationCode ||
      user.verificationCode.toString() !== verificationCode.toString()
    ) {
      return res.json({
        success: false,
        message: "Mã xác nhận không chính xác",
      });
    }
    if (
      user.verificationCodeExpires &&
      Date.now() > user.verificationCodeExpires
    ) {
      return res.json({
        success: false,
        message: "Mã xác nhận đã hết hạn, vui lòng yêu cầu mã mới",
      });
    }
    if (
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Mật khẩu của bạn đã được cập nhật thành công.",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    });
  }
};
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?.id;

  // Kiểm tra xem có userId không (middleware có chạy đúng không)
  if (!userId) {
    console.error("Lỗi nghiêm trọng: Không tìm thấy userId trong request sau khi qua authMiddleware.");
    return res.status(401).json({ success: false, message: "Yêu cầu không được xác thực." });
  }
  // Kiểm tra dữ liệu đầu vào
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "Vui lòng cung cấp mật khẩu cũ và mật khẩu mới." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.warn("Người dùng không tìm thấy với ID:", userId); // Ghi log cảnh báo
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Mật khẩu cũ không chính xác." });
    }

    if (!validator.isStrongPassword(newPassword, { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })) {
      return res.status(400).json({ success: false, message: "Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt." });
    }
    // Không nên đổi nếu mật khẩu mới trùng mật khẩu cũ
    if (oldPassword === newPassword) {
      return res.status(400).json({ success: false, message: "Mật khẩu mới không được trùng với mật khẩu cũ." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    console.log("Mật khẩu đã được cập nhật thành công cho user:", userId);
    res.status(200).json({ success: true, message: "Mật khẩu đã được thay đổi thành công." });
  } catch (error) {
    console.error(`Lỗi trong quá trình đổi mật khẩu cho user ${userId}:`, error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống. Vui lòng thử lại sau." });
  }
};
const listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User Removed" });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: "error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng để cập nhật" });
    }

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Lỗi cập nhật thông tin:", error);
    res.status(500).json({ success: false, message: "Lỗi cập nhật thông tin người dùng", error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, address, email, dateOfBirth, role } =
    req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, phone, address, email, dateOfBirth, role },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel
      .findById(id)
      .select("-password")
      .select("firstName lastName email phone address dateOfBirth image role");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving user data" });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    // Lấy userId từ req.user đã được authMiddleware gắn vào
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Không xác thực được người dùng"
      });
    }

    const user = await userModel.findById(userId)
      .select("-password") // Loại bỏ trường password
      .select("firstName lastName email phone address dateOfBirth image role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng"
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thông tin người dùng"
    });
  }
};

export {
  registerUser,
  loginUser,
  quenmk,
  verifyCodeAndResetPassword,
  changePassword,
  listUser,
  removeUser,
  updateUser,
  getUserInfo,
  updateUserRole,
  getCurrentUser,
};

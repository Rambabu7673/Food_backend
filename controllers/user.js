import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { name, email, number, password, address } = req.body;
  try {
    if (!name || !email || !number || !password || !address) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      number,
      password: hashedPassword,
      address,
    });
    console.log("New User Created", newUser);
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Error adding user",
      error: error.message,
      success: false,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        number: user.number,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      },
    );
    return res.status(200).json({
      message: "User logged in successfully 🎉",
      token,
      user,
      success: true,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Error logging in user",
      error: error.message,
      success: false,
    });
  }
};

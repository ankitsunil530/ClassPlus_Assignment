import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

const localUsers = [];

export const createUser = async (req, res) => {
  try {
    const { name, photo, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "User name is required." });
    }

    const userData = {
      name: name.trim(),
      email: email || undefined,
      photo: photo || ""
    };

    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        id: `local-user-${Date.now()}`,
        ...userData
      });
    }

    const user = await User.create(userData);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to save user information.",
      error: error.message
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, 10);

    if (mongoose.connection.readyState !== 1) {
      const userExists = localUsers.find((user) => user.email === cleanEmail);

      if (userExists) {
        return res.status(409).json({ message: "This email is already registered." });
      }

      const localUser = {
        id: `local-user-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        photo: "",
        passwordHash
      };
      localUsers.push(localUser);
      const { passwordHash: _passwordHash, ...safeUser } = localUser;
      return res.status(201).json(safeUser);
    }

    const userExists = await User.findOne({ email: cleanEmail });

    if (userExists) {
      return res.status(409).json({ message: "This email is already registered." });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to register user.",
      error: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (mongoose.connection.readyState !== 1) {
      const localUser = localUsers.find((user) => user.email === cleanEmail);
      const passwordMatches = localUser && await bcrypt.compare(password, localUser.passwordHash);

      if (!passwordMatches) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const { passwordHash: _passwordHash, ...safeUser } = localUser;
      return res.status(200).json(safeUser);
    }

    const user = await User.findOne({ email: cleanEmail }).select("+passwordHash");
    const passwordMatches = user && await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login.",
      error: error.message
    });
  }
};

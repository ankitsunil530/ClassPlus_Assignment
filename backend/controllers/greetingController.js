import mongoose from "mongoose";
import Greeting from "../models/Greeting.js";

const localGreetings = [];

export const createGreeting = async (req, res) => {
  try {
    const { userId, userName, templateId, templateImage, category } = req.body;

    if (!userId || !userName || !templateId || !templateImage || !category) {
      return res.status(400).json({ message: "All greeting fields are required." });
    }

    const greetingData = {
      userId,
      userName,
      templateId,
      templateImage,
      category
    };

    if (mongoose.connection.readyState !== 1) {
      const localGreeting = {
        id: `local-greeting-${Date.now()}`,
        ...greetingData,
        createdAt: new Date().toISOString()
      };
      localGreetings.unshift(localGreeting);
      return res.status(201).json(localGreeting);
    }

    const greeting = await Greeting.create(greetingData);
    return res.status(201).json(greeting);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to save greeting.",
      error: error.message
    });
  }
};

export const getGreetings = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId query parameter is required." });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(localGreetings.filter((greeting) => greeting.userId === userId));
    }

    const greetings = await Greeting.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(greetings);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to load saved greetings.",
      error: error.message
    });
  }
};

import mongoose from "mongoose";
import Template from "../models/Template.js";
import templateSeeds from "../data/templates.js";

export const getTemplates = async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(templateSeeds.map((template, index) => ({
        id: String(index + 1),
        ...template
      })));
    }

    const existingTemplates = await Template.find().sort({ category: 1 });

    if (existingTemplates.length === 0) {
      const createdTemplates = await Template.insertMany(templateSeeds);
      return res.status(200).json(createdTemplates);
    }

    return res.status(200).json(existingTemplates);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to load greeting templates.",
      error: error.message
    });
  }
};

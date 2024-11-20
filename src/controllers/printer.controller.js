import mongoose from 'mongoose';
import Printer from '../models/printer.model.js';
import { generatePrinter } from '../helpers/generate.js';

export const getPrinters = async (req, res) => {
  try {
    const { campus, building, room, brand, status } = req.query;
    const query = {};
    if (campus) query.campus = campus;
    if (building) query.building = building;
    if (room) query.room = room;
    if (brand) query.brand = brand;
    if (status) {
      if (status === 'enabled') query.enabled = true;
      else if (status === 'disabled') query.enabled = false;
    }
    const printers = await Printer.find(query);
    res.status(200).json(printers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createPrinter = async (req, res) => {
  const printer = req.body;
  const newPrinter = new Printer(printer);
  try {
    await newPrinter.save();
    res.status(201).json(newPrinter);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updatePrinter = async (req, res) => {
  const { id: _id } = req.params;
  const printer = {};
  const { room, building, campus, description, model, brand, status } = req.body;
  if (room) printer.room = room;
  if (building) printer.building = building;
  if (campus) printer.campus = campus;
  if (description) printer.description = description;
  if (model) printer.model = model;
  if (brand) printer.brand = brand;
  if (status === 'enabled') printer.enabled = true;
  else if (status === 'disabled') printer.enabled = false;
  if (Object.keys(printer).length === 0)
    return res.status(400).send('No data to update, please provide data');
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No printer with that id');
  const lastModified = new Date();
  const updatedPrinter = await Printer.findByIdAndUpdate(
    _id,
    { ...printer, lastModified },
    { new: true }
  );
  if (!updatePrinter) {
    res.status(404).send('No printer with that id');
  }
  res.status(200).json(updatedPrinter);
};

export const deletePrinter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No printer with that id');
  try {
    const exists = await Printer.exists({ _id: id });
    if (exists) {
      await Printer.findByIdAndDelete(id);
      res.json({ message: 'Printer deleted successfully' });
    } else {
      res.status(404).send('No printer with that id');
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const generatePrinters = async (req, res) => {
  const { amount } = req.query;
  for (let i = 1; i <= amount; i++) {
    await generatePrinter();
  }
  res.json({ message: `Generated ${amount} printers` });
};

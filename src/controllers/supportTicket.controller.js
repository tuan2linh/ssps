import mongoose from 'mongoose';
import SupportTicket from '../models/supportTicket.model.js';

export const createSupportTicketByStudent = async (req, res) => {
  const { description, printinglog } = req.body;
  const student = req.user._id;
  try {
    const newSupportTicket = await SupportTicket.create({ student, printinglog, description });
    res.status(201).json(newSupportTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSupportTicketByOfficer = async (req, res) => {
  const { supportTicketID } = req.params;
  const { response } = req.body;
  const officer = req.user._id;
  try {
    const updatedSupportTicket = await SupportTicket.findByIdAndUpdate(
      supportTicketID,
      { response, status: 'closed', closedAt: new Date(), officer: officer },
      { new: true }
    );
    res.status(200).json(updatedSupportTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSupportTicketsByStudent = async (req, res) => {
  const student = req.user._id;
  try {
    const supportTickets = await SupportTicket.find({ student })
      .populate('student')
      .populate('printer')
      .populate('officer');
    res.status(200).json(supportTickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSupportTicketsByOfficer = async (req, res) => {
  const { status, printer, startTime, endTime } = req.query;
  const start = new Date(startTime);
  const end = new Date(endTime);
  try {
    const supportTickets = await SupportTicket.find({
      status,
      printer,
      createdAt: { $gte: start, $lte: end }
    })
      .populate('student')
      .populate('printer')
      .populate('officer');
    res.status(200).json(supportTickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const viewSupportTicket = async (req, res) => {
  const { supportTicketID } = req.params;
  try {
    const supportTicket = await SupportTicket.findById(supportTicketID)
      .populate('student')
      .populate('printer')
      .populate('officer');
    res.status(200).json(supportTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

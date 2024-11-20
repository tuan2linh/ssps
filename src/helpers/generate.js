import mongoose from 'mongoose';
import Printer from '../models/printer.model.js';

// Generate random data for the printer model
const brandPrinter = [
  'HP',
  'Brother',
  'Canon',
  'Epson',
  'Samsung',
  'Lexmark',
  'Xerox',
  'Ricoh',
  'Kyocera',
  'Dell',
  'Konica Minolta',
  'Sharp',
  'Toshiba',
  'Panasonic'
];
const campus = ['CS2', 'CS1'];
const buildingCS2 = ['H6', 'H1', 'H2', 'H3'];
const buildingCS1 = ['A1', 'A2', 'B1', 'B2', 'A3'];
const modelPrinter = ['Laser', 'Inkjet', 'Dot Matrix', 'Thermal', 'Solid Ink', 'LED'];
const statusPrinter = [true, false];

export const generatePrinter = async () => {
  const printer = await {
    room: Math.floor(Math.random() * 8) * 100 + Math.floor(Math.random() * 9),
    campus: campus[Math.floor(Math.random() * campus.length)],
    model: modelPrinter[Math.floor(Math.random() * modelPrinter.length)],
    brand: brandPrinter[Math.floor(Math.random() * brandPrinter.length)],
    enabled: statusPrinter[Math.floor(Math.random() * statusPrinter.length)]
  };
  if (printer.campus === 'CS2') {
    printer.building = buildingCS2[Math.floor(Math.random() * buildingCS2.length)];
  } else {
    printer.building = buildingCS1[Math.floor(Math.random() * buildingCS1.length)];
  }
  printer.description = `Máy ${printer.brand} ${printer.model} tại phòng ${printer.room}, tòa nhà ${printer.building}, khu ${printer.campus}`;
  const newPrinter = new Printer(printer);
  await newPrinter.save();
  return newPrinter;
};

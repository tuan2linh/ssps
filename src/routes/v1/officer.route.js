import express from 'express';
import * as officerController from '../../controllers/officer.controller.js';
import * as supportTicketController from '../../controllers/supportTicket.controller.js';
import * as printerController from '../../controllers/printer.controller.js';
import * as printingLogController from '../../controllers/printingLog.controller.js';
import * as uploadFileController from '../../controllers/uploadFile.controller.js';
import auth from '../../middlewares/auth.js';

const officerRouter = express.Router();

// Manage printers
officerRouter.get('/printer', auth('admins'), printerController.getPrinters);
officerRouter.post('/printer', auth('admins'), printerController.createPrinter);
officerRouter.put('/printer/:id', auth('admins'), printerController.updatePrinter);
officerRouter.delete('/printer/:id', auth('admins'), printerController.deletePrinter);
officerRouter.post('/addPrinters', auth('admins'), printerController.generatePrinters);
// Manage students

// Manage support tickets
officerRouter.get('/support', auth('admins'), supportTicketController.getSupportTicketsByOfficer);
officerRouter.post(
  '/support/:id',
  auth('admins'),
  supportTicketController.updateSupportTicketByOfficer
);
// Manage printing logs
officerRouter.get('/printinglog', auth('admins'), printingLogController.getPrintingLogByOfficer);
officerRouter.get('/printinglog/:id', auth('admins'), printingLogController.viewPrintingLog);

// Upload file
officerRouter.get('/uploadFile', auth('admins'), uploadFileController.getAllUpoadedFiles);

export default officerRouter;

// Manage printers

/**
 * @swagger
 * tags:
 *   name: Printers
 *   description: Printer management and retrieval
 */

/**
 * @swagger
 * /v1/officer/printer:
 *   get:
 *     summary: Get all printers
 *     tags: [Printers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of printers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Printer'
 */

/**
 * @swagger
 * /v1/officer/printer:
 *   post:
 *     summary: Create a new printer
 *     tags: [Printers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room
 *               - building
 *               - campus
 *               - description
 *               - model
 *               - branch
 *             properties:
 *               name:
 *                 type: string
 *               model:
 *                 type: string
 *               location:
 *                 type: string
 *             example:
 *               room: Room 101
 *               building: Building 1
 *               campus: Campus 1
 *               description: Printer 1
 *               model: HP LaserJet
 *               brand: HP
 *     responses:
 *       201:
 *         description: Printer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Printer'
 */

/**
 * @swagger
 * /v1/officer/printer/{id}:
 *   put:
 *     summary: Update a printer
 *     tags: [Printers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Printer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *               building:
 *                 type: string
 *               campus:
 *                 type: string
 *               description:
 *                 type: string
 *               model:
 *                 type: string
 *               brand:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               room: Room 101
 *               building: Building 1
 *               campus: Campus 1
 *               description: Printer 1
 *               model: HP LaserJet
 *               brand: HP
 *               status: enabled
 *     responses:
 *       200:
 *         description: Printer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Printer'
 */

/**
 * @swagger
 * /v1/officer/printer/{id}:
 *   delete:
 *     summary: Delete a printer
 *     tags: [Printers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Printer ID
 *     responses:
 *       200:
 *         description: Printer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Printer deleted successfully
 */

// support Ticket

/**
 * @swagger
 * tags:
 *   name: SupportTickets
 *   description: Support ticket management and retrieval
 */

/**
 * @swagger
 * /v1/officer/support:
 *   get:
 *     summary: Get all support tickets
 *     tags: [SupportTickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the support ticket
 *         default: open
 *       - in: query
 *         name: printer
 *         schema:
 *           type: string
 *         description: Printer
 *         default: null
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start time for filtering support tickets
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End time for filtering support tickets
 *     responses:
 *       200:
 *         description: A list of support tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupportTicket'
 */

/**
 * @swagger
 * /v1/officer/support/{id}:
 *   post:
 *     summary: Update a support ticket
 *     tags: [SupportTickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Support ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - response
 *             properties:
 *               response:
 *                 type: string
 *             example:
 *               response: Issue resolved
 *     responses:
 *       200:
 *         description: Support ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportTicket'
 */

// printing log

/**
 * @swagger
 * tags:
 *   name: PrintingLogs
 *   description: Printing log management and retrieval
 */

/**
 * @swagger
 * /v1/officer/printinglog:
 *   get:
 *     summary: Get all printing logs
 *     tags: [PrintingLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the printing log
 *       - in: query
 *         name: printer
 *         schema:
 *           type: string
 *         description: Printer ID
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start time for filtering printing logs
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End time for filtering printing logs
 *     responses:
 *       200:
 *         description: A list of printing logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrintingLog'
 */

/**
 * @swagger
 * /v1/officer/printinglog/{id}:
 *   get:
 *     summary: View a printing log
 *     tags: [PrintingLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Printing log ID
 *     responses:
 *       200:
 *         description: Printing log details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrintingLog'
 */

// upload file
/**
 * @swagger
 * /v1/officer/uploadFile:
 *   get:
 *     summary: Get all uploaded files by admin
 *     tags: [UploadFiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Printing log details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrintingLog'
 */

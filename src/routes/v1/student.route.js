import express from 'express';
import * as studentController from '../../controllers/student.controller.js';
import auth from '../../middlewares/auth.js';
import * as printerController from '../../controllers/printer.controller.js';
import * as printingLogController from '../../controllers/printingLog.controller.js';
import * as supportTicketController from '../../controllers/supportTicket.controller.js';
import * as uploadFileController from '../../controllers/uploadFile.controller.js';

const studentRouter = express.Router();

// Homepage
studentRouter.get('/homepage', auth(), studentController.getInfo); //done
// Account
studentRouter.put('/account/profile', auth(), studentController.updateProfile);
studentRouter.get('/account/loginTime', auth(), studentController.getLoginTime); //done
studentRouter.get('/account/support', auth(), supportTicketController.getSupportTicketsByStudent); //done
studentRouter.post(
  '/account/support',
  auth(),
  supportTicketController.createSupportTicketByStudent
); //done
// Payment
//studentRouter.get('/payment', studentController.getTransaction);
// Printing
studentRouter.get('/printing', auth(), uploadFileController.getUploadedFiles); //done
studentRouter.post('/printing', auth(), uploadFileController.uploadFileController); //done
studentRouter.post('/printing/print', auth(), printingLogController.createPrintingLogs); //done
studentRouter.get('/printing/print', printerController.getPrinters); //done
// Printing Log
studentRouter.get('/printinglog', auth(), printingLogController.getPrintingLogsByStudent); //done
studentRouter.get('/printinglog/:id', auth(), printingLogController.viewPrintingLog); //done

export default studentRouter;

//tags

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management and retrieval
 */

/**
 * @swagger
 * tags:
 *   name: SupportTickets
 *   description: Student management and retrieval
 */

/**
 * @swagger
 * tags:
 *   name: Printing
 *   description: Student management and retrieval
 */

/**
 * @swagger
 * tags:
 *   name: PrintingLogs
 *   description: Student management and retrieval
 */

/**
 * @swagger
 * tags:
 *   name: UploadFiles
 *   description: Student management and retrieval
 */

// routes

// Student
/**
 * @swagger
 * /v1/student/homepage:
 *   get:
 *     summary: Get student homepage info
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student homepage info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /v1/student/account/profile:
 *   put:
 *     summary: Update student profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /v1/student/account/loginTime:
 *   get:
 *     summary: Get student login time
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Login time retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginTime:
 *                   type: string
 *                   format: date-time
 */

// Support ticket
/**
 * @swagger
 * /v1/student/account/support:
 *   get:
 *     summary: Get support tickets by student
 *     tags: [SupportTickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Support tickets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupportTicket'
 */

/**
 * @swagger
 * /v1/student/account/support:
 *   post:
 *     summary: Create a support ticket by student
 *     tags: [SupportTickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - printinglog
 *             properties:
 *               description:
 *                 type: string
 *               printinglog:
 *                 type: string
 *             example:
 *               description: Printer is not working
 *               printinglog: 60d0fe4f5311236168a109cc
 *     responses:
 *       201:
 *         description: Support ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportTicket'
 */

//Upload file
/**
 * @swagger
 * /v1/student/printing:
 *   get:
 *     summary: Get uploaded files by student
 *     tags: [UploadFiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UploadFile'
 */

/**
 * @swagger
 * /v1/student/printing:
 *   post:
 *     summary: Upload a file for printing
 *     tags: [UploadFiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UploadFile'
 */

// Printing
/**
 * @swagger
 * /v1/student/printing/print:
 *   post:
 *     summary: Create printing logs
 *     tags: [Printing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - printer
 *               - printingFile
 *               - color
 *               - printType
 *               - printCount
 *               - totalCost
 *             properties:
 *               printer:
 *                 type: string
 *               printingFile:
 *                 type: string
 *               color:
 *                 type: boolean
 *               printType:
 *                 type: string
 *               printCount:
 *                 type: integer
 *               totalCost:
 *                 type: number
 *             example:
 *               printer: 60d0fe4f5311236168a109cc
 *               printingFile: 60d0fe4f5311236168a109cd
 *               color: false
 *               printType: single-sided
 *               printCount: 10
 *               totalCost: 5.00
 *     responses:
 *       201:
 *         description: Printing log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrintingLog'
 */

/**
 * @swagger
 * /v1/student/printing/print:
 *   get:
 *     summary: Get all printers
 *     tags: [Printing]
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

// Printing log
/**
 * @swagger
 * /v1/student/printinglog:
 *   get:
 *     summary: Get printing logs by student
 *     tags: [PrintingLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: printerID
 *         schema:
 *           type: string
 *         description: Printer ID
 *       - in: query
 *         name: printerBuilding
 *         schema:
 *           type: string
 *         description: Printer building
 *       - in: query
 *         name: printerModel
 *         schema:
 *           type: string
 *         description: Printer model
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for filtering printing logs
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for filtering printing logs
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
 * /v1/student/printinglog/{id}:
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

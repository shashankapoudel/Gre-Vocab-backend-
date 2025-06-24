// routes/pdfRoutes.js
const express = require('express');
const { uploadPdf, getPdfs } = require('../controllers/pdfController');
const router = express.Router();

// Route to upload a PDF
router.post('/uploadpdf', uploadPdf);

// Route to get all PDFs
router.get('/getpdfs', getPdfs);

module.exports = router;

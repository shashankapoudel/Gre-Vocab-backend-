// controllers/pdfController.js
const path = require('path');
const fs = require('fs');
const upload = require('../middlewares/upload');

// Upload a PDF
const uploadPdf = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        } else if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded!' });
        } else {
            return res.status(200).json({
                success: true,
                message: 'File uploaded successfully!',
                filePath: `/pdfs/${req.file.filename}` // File path to be stored
            });
        }
    });
};

// Retrieve all PDFs
const getPdfs = (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads/pdfs');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan directory' });
        }

        const fileList = files.map(file => ({
            title: file, // You can extend this to store more metadata in a database
            url: `/pdfs/${file}`
        }));

        return res.status(200).json(fileList);
    });
};

module.exports = { uploadPdf, getPdfs };

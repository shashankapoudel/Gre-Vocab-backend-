// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/pdfs', // Folder where files will be stored
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Max file size (in bytes) => 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('pdf'); // Expect a single file field named 'pdf'

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only PDFs are allowed!');
    }
}

module.exports = upload;

import multer from 'multer';
import path from 'path';

// Configure multer for CSV file uploads
const storage = multer.memoryStorage();

// File filter to only allow CSV files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     'csv',
//     'application/vnd.ms-excel',
//     'application/csv',
//     'application/x-csv',
//     'text/x-csv',
//     'text/comma-separated-values',
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error('Invalid file type. Only CSV files are allowed.'), false); // Reject file
//   }
// };

const upload = multer({
  storage,
  // fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware for handling single file upload
export const uploadMiddleware = (req, res, next) => {
  const uploadSingle = upload.single('file'); // Expecting a file with key 'file'

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // File type error or custom errors
      return res.status(400).json({ message: err.message });
    }

    // Check if file is missing
    if (!req.File) {
      return res.status(400).json({ message: 'No file uploaded middelware' });
    }

    next(); // Proceed to the next middleware
  });
};

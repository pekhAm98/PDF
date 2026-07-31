import multer from 'multer';

// Configure multer storage
const storage = multer.memoryStorage(); 

const upload = multer({ 
    storage , 
    limits: { fileSize: 10 * 1024 * 1024 } ,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!') as any, false);
        }

}}); // Limit file size to 10MB

export default upload;
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
export const uploadPdf = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        else {
            const uploadsDir = path.resolve(process.cwd(), 'uploads');
            fs.mkdirSync(uploadsDir, { recursive: true });

            
            const filePath = path.join(uploadsDir, req.file.originalname);

            fs.writeFileSync(filePath, req.file.buffer);
            return res.status(200).json({ message: 'File uploaded successfully', fileName: req.file.originalname });
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
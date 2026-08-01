import { Request, Response } from "express";
import { db } from "../lib/prisma";

///______________________________////
//Bull MQ
import { Queue} from 'bullmq';
import { redis } from "../lib/redis";

const queue = new Queue('pdf-processing', {
  connection: redis,
});



export const uploadPdf = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    } else {
      try {

        const pdfRecord = await db.file.create({
          data: {
            fileName: req.file.originalname,
            data: new Uint8Array(req.file.buffer),
            mimeType: req.file.mimetype,
            size: req.file.size,
          },  
        });
        ///Bull MQ
        await queue.add('process-pdf', { fileId: pdfRecord.id, fileName: pdfRecord.fileName });
        // Return the saved record as a response

        return res.status(200).json({ message: "File uploaded successfully"});
      } catch (error) {
        console.error("Error saving file record:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPdf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "File ID is required" });
    }
    const pdfRecord = await db.file.findUnique({
      where: { id: req.params.id as string },
    });
    if (!pdfRecord) {
      return res.status(404).json({ message: "File not found" });
    }

    res.setHeader("Content-Type", pdfRecord.mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${pdfRecord.fileName}"`);
    return res.send(Buffer.from(pdfRecord.data));
  } catch (error) {
    console.error("Error fetching file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePdf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "File ID is required" });
    }
    const pdfRecord = await db.file.findUnique({
      where: { id: req.params.id as string },
    });
    if (!pdfRecord) {
      return res.status(404).json({ message: "File not found" });
    }

    await db.file.delete({
      where: { id: req.params.id as string },
    });

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listPdfs = async (req: Request, res: Response) => {
  try {
    const pdfRecords = await db.file.findMany({
      select: {
        id: true,
        fileName: true,
      },
    });
    return res.status(200).json({ files: pdfRecords });
  } catch (error) {
    console.error("Error listing files:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default uploadPdf;

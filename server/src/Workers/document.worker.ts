import { Worker } from 'bullmq';
import { redis } from '../lib/redis';
import { db } from '../lib/prisma';
console.log("Worker pdf-processing started..")
import { processPdf } from '../Rag/embedding';
const worker = new Worker('pdf-processing', async job => {
  if (job.name === 'process-pdf') {
    const { fileId, fileName } = job.data;
    // Add your PDF processing logic here
    //Read the file from the database using the fileId
    //chunk the pdf
    //call embedding model to get the embedding vector
    //store the embedding vector in the database with the fileId and chunk number QUADRANTDB

    console.log(`Processing PDF file: ${fileName} with ID: ${fileId}`);
    await db.file.update({
      where: { id: fileId },
      data: { status: 'PROCESSING' },
    });

    try {
      const pdfRecord = await db.file.findUnique({
        where: { id: fileId },
      });

      if (!pdfRecord) {
        throw new Error(`File with id ${fileId} not found`);
      }

      await processPdf(Buffer.from(pdfRecord.data), fileId);

      await db.file.update({
        where: { id: fileId },
        data: { status: 'COMPLETED' },
      });
    } catch (error) {
      await db.file.update({
        where: { id: fileId },
        data: { status: 'FAILED' },
      });

      throw error;
    }
  }
}, 
{
  connection: redis,
  concurrency: 5,
}
);
 worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});


worker.on("failed", (job, err) => {
  console.error(
    `Job ${job?.id} failed`,
    err
  );
});
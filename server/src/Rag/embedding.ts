import { QdrantVectorStore } from "@langchain/qdrant";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";

async function extractPdfText(buffer: Buffer) {

  const parser = new PDFParse({
    data: buffer,
  });

  const result = await parser.getText();

  return result.text;
}

export const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
});


export const vectorStore = new QdrantVectorStore(
  embeddings,
  {
    url: process.env.QDRANT_URL || "http://localhost:6333",
    //apiKey: process.env.QDRANT_API_KEY,
    collectionName: "pdf-embeddings",
  }
);

export const processPdf = async (pdfBuffer: Buffer ,fileId: string) => {
  const text = await extractPdfText(pdfBuffer);
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks_content = await textSplitter.splitText(text);
  console.log(chunks_content.length, "chunks created for fileId:", fileId);
  for (let i = 0; i < chunks_content.length; i+=10) {
    const batch = chunks_content.slice(i, i + 10);
    const documents = batch.map((chunk, index) => new Document({ pageContent: chunk, metadata: { fileId, chunkIndex: i + index } }));
    await vectorStore.addDocuments(documents);
    console.log(`Added batch of ${i + 1}-${i + documents.length}/${chunks_content.length} chunks to Qdrant for fileId: ${fileId}`);
  }
  
  return ;
};
    
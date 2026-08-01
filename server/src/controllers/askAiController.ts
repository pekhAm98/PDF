import { Request, Response } from "express";
import retriever from "../Rag/retreiver";
import { getLLMResponse } from "../Rag/model";
export const askAi = async (req: Request, res: Response) => {
  const { message } = req.body;
  const query = message as string;
  try {
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const casualMessages = ["hi", "hello", "hey", "how are you", "thanks", "thank you", "bye", "who are you"];

    const isCasual = casualMessages.some((msg) => query.toLowerCase().includes(msg));

    if (isCasual) {
      const response = await getLLMResponse([], query);
      return res.status(200).json(response);
    }

    let filteredDocuments: Awaited<ReturnType<typeof retriever.getRelevantDocuments>> = [];
    try {
      filteredDocuments = await retriever.getRelevantDocuments(query);
    } catch (error) {
      // Retrieval can fail if vector DB is unavailable; continue with empty context.
      console.error("Retriever failed, continuing without context:", error);
    }

    console.log("QUERY:", message);

    console.log(
      "RETRIEVED DOCS:",
      filteredDocuments.map((doc) => ({
        content: doc.pageContent.slice(0, 100),
        metadata: doc.metadata,
      })),
    );
    const response = await getLLMResponse(filteredDocuments, query);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching relevant documents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

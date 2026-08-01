import { Request, Response } from "express";
import retriever from "../Rag/retreiver";
import { getLLMResponse } from "../Rag/model";
export  const askAi = async (req: Request, res: Response) => {
const  {userQuery}  = req.query;
const query = userQuery as string;
  try {
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
    const filteredDocuments = await retriever.getRelevantDocuments(query);
    const response = await getLLMResponse(filteredDocuments, query);

    return res.status(200).json({ data: response });
  } catch (error) {
    console.error("Error fetching relevant documents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
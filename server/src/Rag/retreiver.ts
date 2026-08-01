import { vectorStore } from './embedding';


//RAG RETREIVAL

export const getRelevantDocuments = async (query: string) => {
  try {
    const relevantDocs = await vectorStore.similaritySearch(query, 5);
    return relevantDocs;
  } catch (error) {
    console.error("Error fetching relevant documents:", error);
    throw error;
  }
};


export default {
  getRelevantDocuments,
};
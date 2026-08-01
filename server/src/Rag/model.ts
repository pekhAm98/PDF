import { OpenAI } from "openai";
import type { DocumentInterface } from "@langchain/core/documents";

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
const systemPrompt = `
You are a helpful AI assistant.

You have access to document context when answering questions about uploaded documents.

Rules:
1. If the user asks about the uploaded documents, use the provided context.
2. If the question is general conversation or casual chat, answer normally.
3. Do not invent information from the documents.
4. If a document-related question cannot be answered from the context, say "I don't know based on the provided documents."
`;
const ollamaBaseUrl = (process.env.OLLAMA_BASE_URL || "http://localhost:11434").replace(/\/$/, "");
const llmModel = process.env.LLM_MODEL || "llama3.2";


context.push({
    role: "system",
    content: systemPrompt,
})



const ai = new OpenAI({
  apiKey: "docker",
  baseURL:
    process.env.QWEN_API_URL || "http://localhost:12434/engines/v1",
});
export const getLLMResponse = async (
  filteredDocuments: Array<DocumentInterface<Record<string, unknown>>>,
  query: string
) => {
    // Add the content of the filtered documents to the context
    const retrievedContext = filteredDocuments
    .map((doc, index) => 
      `Document ${index + 1}:\n${doc.pageContent}`
    )
    .join("\n\n");

  try {
    const response = await ai.chat.completions.create({
      model: llmModel,
      messages: [
        ...context,
        {
          role: "system",
          content: retrievedContext || "No relevant context found.",
        },
        {
          role: "user",
          content: query,
        },
      ],
    });
    const assistantContent = response.choices[0]?.message?.content || "I don't know.";
    context.push({
        role: "assistant",
        content: assistantContent,
    });
    return assistantContent;
  } catch (error) {
    console.error("Error getting LLM response:", error);
    return "I don't know.";
  }
};



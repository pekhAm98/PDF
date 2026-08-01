import { OpenAI } from "openai";
import type { DocumentInterface } from "@langchain/core/documents";

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
const systemPrompt = "You are a helpful assistant that answers questions based on the provided context. If the answer is not contained within the context, respond with 'I don't know.'"


context.push({
    role: "system",
    content: systemPrompt,
})

const ai = new OpenAI({
  apiKey: "docker",
  baseURL: "http://localhost:12434/engines/v1",
});

export const getLLMResponse = async (
  filteredDocuments: Array<DocumentInterface<Record<string, unknown>>>,
  query: string
) => {
    // Add the content of the filtered documents to the context
    const retreivedContext = filteredDocuments
    .map((doc, index) => 
      `Document ${index + 1}:\n${doc.pageContent}`
    )
    .join("\n\n");

  try {
    const response = await ai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        ...context,
        {
          role: "system",
          content: retreivedContext,
        },
        {
          role: "user",
          content: query,
        },
      ],
    });
    context.push({
        role: "assistant",
        content: response.choices[0].message.content,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting LLM response:", error);
    throw error;
  }
};



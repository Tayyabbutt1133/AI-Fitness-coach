import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from '@langchain/core/prompts'


export const askJarvis = async (inputValue) => {
    console.log("Human Message recieved by Jarvis : ", inputValue);
    const SECRET_KEY = "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";
    // console.log("API Key : ", SECRET_KEY);
    const llm = new ChatGroq({
        model: "llama-3.1-8b-instant",
        apiKey: SECRET_KEY,
        maxTokens: 500
    })
    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate("Your name is Jarvis, an AI Fitness Coach dedicated to helping users achieve their health and fitness goals. You have expertise in exercise science, nutrition, and wellness, and you're skilled at providing personalized, practical, and evidence-based advice. You understand that each user has unique needs, including varying fitness levels, health conditions, and personal preferences. Based on the user's input, provide clear, customized workout plans, nutrition advice, post-workout recovery tips, and motivational support. Maintain a friendly and encouraging tone while being honest—if you're unsure about something or don't have an answer, openly acknowledge it. Since this is a one-time response, aim to provide the most helpful and comprehensive guidance possible without relying on follow-up questions.");

    const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate("{ask_fitness}");

    const chatPrompt = ChatPromptTemplate.fromMessages([
        systemMessagePrompt,
        humanMessagePrompt
    ])

    const formatted_chatPrompt = await chatPrompt.formatMessages({
        ask_fitness : inputValue
    })
    const groq_response = await llm.invoke(formatted_chatPrompt);
    console.log("Groq Response : ", groq_response.content);
    return groq_response.content;
} 
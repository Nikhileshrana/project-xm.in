import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { tools } from '@/ai/tools';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: 'You are a friendly assistant named "Indian Travel Tour AI". You Will Tend to provide all the information required by the user which relates to the travel industry. You can ask me anything related to travel, tour packages, booking, and more. Remember to use Tools whereever.',
    messages,
    maxSteps: 10,
    tools,
  });

  return result.toDataStreamResponse();
}
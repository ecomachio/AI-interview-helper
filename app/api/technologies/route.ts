export const dynamic = 'force-dynamic';

import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { NextResponse } from 'next/server';
import { Technology } from '@/components/store';

function parseTechnologies(rawTechnologies: string): Technology[] {
  const lines = rawTechnologies.split('\n');
  const technologies: Technology[] = [];
  let currentTech: Partial<Technology> = {};

  for (const line of lines) {
    if (!line) continue; // Skip empty lines

    if (line.startsWith('name:')) {
      if (currentTech.name) { // Save previous tech if exists
        technologies.push(currentTech as Technology);
        currentTech = {};
      }
      currentTech.name = line.replace('name:', '').trim();
    } else if (line.startsWith('description:')) {
      currentTech.description = line.replace('description:', '').trim();
    }

    currentTech.familiarity = 5;
  }

  // Push the last technology
  if (currentTech.name) {
    technologies.push(currentTech as Technology);
  }

  return technologies;
}

// const PROMPT = `
// can you please create a study plan based on the following job requirements? make sure to include all the technologies and concepts asked from the candidate. return a list of items with the study plan. return just a list of items in markdown format, no other text. at the end of the response add a simple list of technologies named "Technologies" exactly no matter the language.
// `

const PROMPT = `
Extract a list of technologies from the following job requirements. Return the technologies in raw text format, with each entry consisting of a name and a short description. The description should be a concise 1 to 10-word explanation of the technology's purpose. Do not include any text other than the list. Ensure the format is exactly as follows:
name: [Technology Name]
description: [Brief description of the technology]

Example:
name: Java
description: Java is a programming language and platform for application development.
name: AWS
description: AWS is a cloud computing platform for building, deploying, and scaling applications.

each entry should be on a new line.
`

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: 'https://api.groq.com/openai/v1'
})

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { input } = await req.json();

  // Get a language model
  const model = groq('llama-3.1-70b-versatile')

  // Call the language model with the prompt
  const result = await generateText({
    model,
    prompt: `${PROMPT} ${input}`,
    maxTokens: 1000,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 1,
  })

  const technologies = parseTechnologies(result.text);

  // Respond with a streaming response
  return NextResponse.json({ response: technologies })
}

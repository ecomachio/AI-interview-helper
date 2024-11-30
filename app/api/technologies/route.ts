import { Technology } from "@/components/store";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from 'ai'
import { NextResponse } from "next/server";

const PROMPT = `
Create a study plan based on the following technologies. Make sure to include all the technologies and concepts asked from the candidate. Return a list of items with the study plan. Return just a list of items in markdown format, no other text. At the end of the response add a simple list of technologies named "Technologies" exactly no matter the language.
`

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: 'https://api.groq.com/openai/v1'
})

function generateLearningRoadmapPrompt(technologies: Technology[]): string {
  return `
You are an expert technical learning path architect specializing in creating precise, sequential learning roadmaps.

Objective: Generate a comprehensive, step-by-step learning roadmap for each technology that provides a clear progression path.

Input Technologies:
${technologies.map(tech => `- ${tech.name}: Current Level ${tech.familiarity}/10`).join('\n')}

Roadmap Creation Guidelines:
1. Structure Principles:
   - Create a sequential learning path with logical progression
   - Number steps from 0 (absolute beginner) to advanced mastery
   - Adapt complexity based on current familiarity level
   - Ensure each step builds upon previous knowledge

2. Roadmap Composition:
   - 0-2 Level: Comprehensive foundational learning
   - 3-5 Level: Bridging fundamental and intermediate concepts
   - 6-8 Level: Advanced techniques and deep dives
   - 9-10 Level: Cutting-edge and expert-level skills

3. For Each Step, Include:
   - Clear, actionable title
   - Learning type (prerequisite, foundational, advanced, mastery)
   - Estimated time to complete
   - Key concepts to master
   - Recommended learning resources
   - Practical project suggestions
   - Skills to be acquired

4. Progression Criteria:
   - Clearly define entry and exit requirements for each step
   - Provide metrics to assess readiness to move to next stage
   - Suggest self-assessment techniques

5. Additional Considerations:
   - Highlight potential career applications
   - Recommend community resources and networking opportunities
   - Suggest real-world project ideas for practical application

Output Requirements:
- Structured, JSON-parseable format
- Comprehensive yet concise description
- Technology-specific learning paths
- Clear progression indicators

Focus on creating a roadmap that is:
- Logical and sequential
- Adaptable to individual learning pace
- Comprehensive yet not overwhelming
- Practical and goal-oriented

Provide a detailed, step-by-step learning roadmap that transforms current skill levels into comprehensive technical expertise.
`;
}

const createStudyPlanByTechnology = async (technologiesList: Technology[]) => {
  // Get a language model
  const model = groq('llama-3.1-70b-versatile')

  // Call the language model with the prompt
  const result = await generateText({
    model,
    prompt: generateLearningRoadmapPrompt(technologiesList),
    maxTokens: 1000,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 1,
  })

  console.log(result.text)

  return result.text
}

export async function POST(req: Request) {
  const { technologiesList } = await req.json();
  const studyPlan = await createStudyPlanByTechnology(technologiesList)
  console.log(studyPlan)
  return NextResponse.json({ response: studyPlan })
}


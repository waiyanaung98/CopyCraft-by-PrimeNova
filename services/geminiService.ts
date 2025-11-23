import { GoogleGenAI } from "@google/genai";
import { ContentRequest, Framework, Language, ContentPillar, AppMode } from '../types';

// Initialize the client
// @ts-ignore
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

const getFrameworkInstruction = (framework: Framework): string => {
  switch (framework) {
    // --- COPYWRITING ---
    case Framework.AIDA:
      return "Apply the AIDA framework:\n1. Attention: Grab attention with a hook.\n2. Interest: Build interest with facts/details.\n3. Desire: Create desire by showing benefits.\n4. Action: Clear Call to Action (CTA).";
    case Framework.PAS:
      return "Apply the PAS framework:\n1. Problem: Identify a pain point.\n2. Agitation: Agitate the pain, make it visceral.\n3. Solution: Present the product/service as the ultimate solution.";
    case Framework.BAB:
      return "Apply the BAB framework:\n1. Before: Describe the current negative situation.\n2. After: Describe the ideal future situation.\n3. Bridge: Show how the product gets them from Before to After.";
    case Framework.FAB:
      return "Apply the FAB framework:\n1. Features: What it does.\n2. Advantages: Why it helps.\n3. Benefits: The underlying emotional or tangible payoff.";
    case Framework.QUEST:
      return "Apply the QUEST framework:\n1. Qualify the audience.\n2. Understand their problem.\n3. Educate them on the solution.\n4. Stimulate desire.\n5. Transition to action.";
    case Framework.FOUR_P:
      return "Apply the 4 Ps framework:\n1. Promise: Make a bold claim or promise about what the product does.\n2. Picture: Paint a vivid visual picture of the user enjoying the benefits.\n3. Proof: Provide evidence (social proof, facts, logic) that the promise is true.\n4. Push: A strong call to action.";
    case Framework.PASTOR:
      return "Apply the PASTOR framework:\n1. Problem: Describe the problem.\n2. Amplify: Amplify the consequences of not solving it.\n3. Story: Tell a story related to the solution.\n4. Transformation: Describe the transformation.\n5. Offer: Describe exactly what you are offering.\n6. Response: Ask for a response (CTA).";
    case Framework.FREESTYLE:
      return "Create engaging, high-quality content optimized for social media or blogs. Use short paragraphs, emojis where appropriate, and a compelling structure.";
      
    // --- SCRIPTWRITING ---
    case Framework.HOOK_VALUE_CTA:
      return "Create a Short Video Script (TikTok/Reels style, 15-60s):\n1. Hook (0-3s): Stop the scroll immediately.\n2. Value/Body: Deliver the core message quickly.\n3. CTA: Strong directive on what to do next.";
    case Framework.HERO_JOURNEY:
      return "Create a Storytelling Script (Hero's Journey):\n1. The Known World: Establish normality.\n2. The Inciting Incident: The problem/challenge.\n3. The Journey: Struggles and discovery of the solution.\n4. The Transformation: Life after the solution.";
    case Framework.EXPLAINER:
      return "Create an Explainer Video Script:\n1. The 'What': Briefly define the topic.\n2. The 'Why': Why it matters.\n3. The 'How': Step-by-step explanation.\n4. Key Takeaway/Summary.";
    case Framework.PROBLEM_SOLUTION_STORY:
      return "Create a Video Sales Letter (VSL) Script:\n1. Call out the audience.\n2. Describe their pain vividly.\n3. Tell a story of overcoming that pain using the solution.\n4. Present the offer clearly.";
    case Framework.LISTICLE_VIDEO:
      return "Create a Listicle Video Script (e.g., Top 5 Tips):\n- Intro: Hook the viewer.\n- Items: Numbered points (1, 2, 3...) with brief explanations.\n- Outro: Summary and CTA.";
      
    default:
      return "";
  }
};

const getLanguageInstruction = (language: Language): string => {
  switch (language) {
    case Language.MY:
      return "Write the response in Myanmar (Burmese) language. Ensure the font encoding is standard Unicode. Use natural, flowing Burmese appropriate for the content type (spoken style for scripts, written style for copy). Do NOT just transliterate English idioms, adapt them culturally.";
    case Language.TH:
      return "Write the response in Thai language. Use polite and persuasive Thai appropriate for marketing contexts.";
    case Language.EN:
    default:
      return "Write the response in English.";
  }
};

const getPillarInstruction = (pillar: ContentPillar): string => {
  switch (pillar) {
    case ContentPillar.EDUCATIONAL:
      return "Focus on teaching the audience something valuable. Use a helpful, authoritative voice. Include tips or steps.";
    case ContentPillar.PROMOTIONAL:
      return "Focus on conversion and sales. Highlight offers, scarcity, and value proposition.";
    case ContentPillar.INSPIRATIONAL:
      return "Focus on storytelling and motivation. Connect on an emotional level.";
    case ContentPillar.ENTERTAINMENT:
      return "Focus on engagement. Be lighthearted, relatable, or humorous.";
    case ContentPillar.BEHIND_SCENES:
      return "Focus on authenticity. Show the process, the people, or the 'why' behind the product.";
    case ContentPillar.COMMUNITY:
      return "Focus on social proof and belonging. Highlight user experiences or testimonials.";
    default:
      return "";
  }
};

export const generateCopy = async (request: ContentRequest): Promise<string> => {
  const { mode, topic, description, framework, language, tone, targetAudience, pillar, brand } = request;

  const isScript = mode === AppMode.SCRIPTWRITING;

  const systemInstruction = `You are a world-class ${isScript ? 'Video Scriptwriter and Director' : 'Copywriter and Content Strategist'}.
Your goal is to write persuasive, high-converting ${isScript ? 'video scripts' : 'marketing copy'}.
You are fluent in English, Myanmar, and Thai.
Always format the output using Markdown.

${isScript ? `
FOR SCRIPTWRITING:
- Use a clear script format.
- Include [VISUAL] cues in brackets describing what should be seen on screen.
- Include [AUDIO] or [SPEAKER] cues describing spoken dialogue or sound effects.
- Include estimated duration for sections if applicable.
- Write dialogue in a natural, spoken rhythm.
` : `
FOR COPYWRITING:
- Use headers, bullet points, and bold text for readability.
- Do not explain the framework, just use it to structure the content.
`}`;

  // Construct the Brand Context Block
  const brandContext = brand 
    ? `
    BRAND IDENTITY:
    - Brand Name: ${brand.name}
    - Industry: ${brand.industry}
    - Brand Story/Context: ${brand.description}
    - Standard Audience: ${brand.defaultAudience}
    `
    : `BRAND IDENTITY: Generic / Not specified`;

  const prompt = `
  ${brandContext}

  CONTENT REQUEST (${isScript ? 'VIDEO SCRIPT' : 'WRITTEN COPY'}):
  Topic: ${topic}
  Context/Details: ${description}
  Target Audience: ${targetAudience || brand?.defaultAudience || "General Audience"}
  Tone of Voice: ${tone}
  Content Pillar/Theme: ${pillar}
  
  TASK:
  ${getFrameworkInstruction(framework)}
  
  CONTENT FOCUS (Pillar):
  ${getPillarInstruction(pillar)}
  
  LANGUAGE REQUIREMENT:
  ${getLanguageInstruction(language)}
  
  IMPORTANT RULES:
  - Make it creative and engaging.
  - If using Myanmar language, ensure it reads naturally to native speakers. ${isScript ? 'For scripts, use spoken/colloquial Burmese grammar.' : ''}
  - Use appropriate emojis for the ${tone} tone and ${pillar} theme.
  - Ensure the content aligns with the Brand Identity provided above.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Sorry, I couldn't generate the content at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please check your connection or API key.");
  }
};
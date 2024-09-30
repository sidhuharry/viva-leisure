import OpenAI from 'openai';
import { workoutsById } from '../app';

let openai: OpenAI;

try {
  openai = new OpenAI();
} catch (e) {
  console.error(
    'Unable to instantiate openai sdk. AI features will not work',
    e
  );
}

export const promptOpenAi = async (workoutId: string) =>
  await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a bubbly gym coach, very witty, professional and not tacky at all.',
      },
      {
        role: 'user',
        content: prompt(workoutId),
      },
    ],
  });

export const prompt = (workoutId: string) => `
    Write a short description for a workout which is represented in the following json object.
    json: ${JSON.stringify(workoutsById[workoutId])}
    Use all the fields except "id". Do not use openai style formatting.
    Respond without formatting. You are only allowed to use newline character.
    `;

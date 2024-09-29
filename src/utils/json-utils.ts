import { readFileSync } from 'fs';
import path from 'path';
import { Workout } from '../types/workouts';

// TODO stream the json to improve performance
// https://www.npmjs.com/package/stream-json
export const readJson = () => {
  try {
    const filePath = path.resolve(__dirname, '../../workouts/workouts.json');
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Workout[];
  } catch (error) {
    console.error('Error reading json file:', error);
    return null;
  }
};

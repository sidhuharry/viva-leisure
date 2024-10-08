# How to run
Steps:
1. Run `npm i`
2. Copy the .env file in the root folder. Navigate to the root of the project and run `cp env.sample .env`
3. Make sure you have exported openai api key in your environment variable. Follow the instructions given here: [link](https://platform.openai.com/docs/quickstart/create-and-export-an-api-key)
4. Run `npm run dev` for dev mode or `npm start`
5. To make requests use postman or any other REST API testing tool. Please include `x-api-key` header in the requests as APIs are protected by a simple `API_KEY` which is hardcoded in `.env` file.

# Testing
Jest for unit testing and supertest for integration api test.
run `npm run test` for tests

# Endpoints
## `GET '/v1/api/workout/:workoutId'`
Gets you workout by id. Requires path params `{workoutId}`

## `GET '/v1/api/list-tags`
Lists all the tags from workouts.json file

## `GET '/v1/api/workouts'`

Query Params:
* Nothing: returns all workouts
* tag: returns workouts by tags
* searchName: returns workouts by name
* durationMin & durationMax: returns workouts by range
* duration: returns workouts by exact duration

## `GET '/v1/api/workout/:workoutId/ai/desc'`
Returns workout description generated from openai

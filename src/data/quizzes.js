// src/data/quizzes.js

export const quizzesData = {
  "quiz101": {
    "id": "quiz101",
    "title": "Quiz: Solar & Pendulum Fun",
    "exhibit_name": "Solar Energy / Pendulum",
    "questions": [
      {
        "questionText": "What powers a solar cell?",
        "options": [
          { "optionText": "Wind", "isCorrect": false },
          { "optionText": "Sunlight", "isCorrect": true },
          { "optionText": "Water", "isCorrect": false }
        ]
      },
      {
        "questionText": "What force keeps the pendulum moving?",
        "options": [
          { "optionText": "Magnetism", "isCorrect": false },
          { "optionText": "Momentum and Gravity", "isCorrect": true },
          { "optionText": "Static Electricity", "isCorrect": false }
        ]
      }
    ]
  },
  "quiz102": {
    "id": "quiz102",
    "title": "Quiz: Plasma Power",
    "exhibit_name": "Plasma Sphere",
    "questions": [
      {
        "questionText": "What state of matter is plasma?",
        "options": [
          { "optionText": "Solid", "isCorrect": false },
          { "optionText": "Liquid", "isCorrect": false },
          { "optionText": "Gas", "isCorrect": false },
          { "optionText": "Fourth State", "isCorrect": true }
        ]
      }
    ]
  }
};
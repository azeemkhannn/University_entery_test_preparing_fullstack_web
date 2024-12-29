import { parse } from 'csv-parse';

export const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const questions = [];
    
    parse(buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    })
    .on('data', (row) => {
      // Convert CSV row to question object
      const question = {
        text: row.question,
        options: [
          row.option1,
          row.option2,
          row.option3,
          row.option4
        ].filter(Boolean), // Remove empty options
        correctAnswer: parseInt(row.correctAnswer) - 1, // Convert to 0-based index
        explanation: row.explanation
      };
      questions.push(question);
    })
    .on('error', (error) => reject(error))
    .on('end', () => resolve(questions));
  });
};

export const validateQuestions = (questions) => {
  const errors = [];

  questions.forEach((question, index) => {
    if (!question.text) {
      errors.push(`Question ${index + 1}: Missing question text`);
    }
    if (!Array.isArray(question.options) || question.options.length < 2) {
      errors.push(`Question ${index + 1}: Must have at least 2 options`);
    }
    if (typeof question.correctAnswer !== 'number' || 
        question.correctAnswer < 0 || 
        question.correctAnswer >= question.options.length) {
      errors.push(`Question ${index + 1}: Invalid correct answer`);
    }
    if (!question.explanation) {
      errors.push(`Question ${index + 1}: Missing explanation`);
    }
  });

  return errors;
};
import Question from '../models/Question.js';
import { NotFoundError } from '../utils/errors.js';
import { generateAIAnswer } from '../services/aiService.js';

export const createQuestion = async (req, res, next) => {
  try {
    const { subject, title, content, imageUrl } = req.body;
    
    const question = new Question({
      user: req.userId,
      subject,
      title,
      content,
      imageUrl
    });

    await question.save();

    // Generate AI answer if possible
    try {
      const aiAnswer = await generateAIAnswer(content);
      if (aiAnswer) {
        question.answers.push({
          content: aiAnswer,
          isAIGenerated: true
        });
        await question.save();
      }
    } catch (error) {
      console.error('AI answer generation failed:', error);
    }

    res.status(201).json({
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    const { subject, status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (subject) query.subject = subject;
    if (status) query.status = status;

    const questions = await Question.find(query)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Question.countDocuments(query);

    res.json({
      questions,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('user', 'name')
      .populate('answers.user', 'name');

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const addAnswer = async (req, res, next) => {
  try {
    const { content } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    question.answers.push({
      content,
      user: req.userId
    });
    question.status = 'answered';
    
    await question.save();

    res.json({
      message: 'Answer added successfully',
      question
    });
  } catch (error) {
    next(error);
  }
};

export const voteAnswer = async (req, res, next) => {
  try {
    const { id, answerId } = req.params;
    const { vote } = req.body; // 1 for upvote, -1 for downvote

    const question = await Question.findById(id);
    if (!question) {
      throw new NotFoundError('Question not found');
    }

    const answer = question.answers.id(answerId);
    if (!answer) {
      throw new NotFoundError('Answer not found');
    }

    answer.votes += vote;
    await question.save();

    res.json({
      message: 'Vote recorded successfully',
      answer
    });
  } catch (error) {
    next(error);
  }
};
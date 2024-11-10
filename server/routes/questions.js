import express from 'express';
import { 
  createQuestion, 
  getQuestions, 
  getQuestionById,
  addAnswer,
  voteAnswer
} from '../controllers/questionController.js';
import { auth } from '../middleware/auth.js';
import { validateQuestion } from '../validators/questionValidator.js';

const router = express.Router();

router.post('/', auth, validateQuestion, createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/:id/answers', auth, addAnswer);
router.post('/:id/answers/:answerId/vote', auth, voteAnswer);

export default router;
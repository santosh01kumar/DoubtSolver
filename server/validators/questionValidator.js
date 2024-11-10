import { z } from 'zod';

const questionSchema = z.object({
  subject: z.string().min(1),
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  imageUrl: z.string().url().optional()
});

export const validateQuestion = (req, res, next) => {
  try {
    questionSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      details: error.errors
    });
  }
};
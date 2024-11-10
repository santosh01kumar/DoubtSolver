import api from './api';

export interface Question {
  _id: string;
  title: string;
  content: string;
  subject: string;
  imageUrl?: string;
  user: {
    _id: string;
    name: string;
  };
  answers: Answer[];
  status: 'pending' | 'answered' | 'resolved';
  createdAt: string;
}

export interface Answer {
  _id: string;
  content: string;
  user?: {
    _id: string;
    name: string;
  };
  isAIGenerated: boolean;
  votes: number;
  createdAt: string;
}

export interface CreateQuestionData {
  title: string;
  content: string;
  subject: string;
  imageUrl?: string;
}

export const createQuestion = async (data: CreateQuestionData) => {
  const response = await api.post<{ question: Question }>('/questions', data);
  return response.data.question;
};

export const getQuestions = async (params?: {
  subject?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<{
    questions: Question[];
    total: number;
    pages: number;
  }>('/questions', { params });
  return response.data;
};

export const getQuestionById = async (id: string) => {
  const response = await api.get<Question>(`/questions/${id}`);
  return response.data;
};

export const addAnswer = async (questionId: string, content: string) => {
  const response = await api.post<{ question: Question }>(
    `/questions/${questionId}/answers`,
    { content }
  );
  return response.data.question;
};

export const voteAnswer = async (
  questionId: string,
  answerId: string,
  vote: 1 | -1
) => {
  const response = await api.post<{ answer: Answer }>(
    `/questions/${questionId}/answers/${answerId}/vote`,
    { vote }
  );
  return response.data.answer;
};
import { UserModel } from '../../user-management/models/userModel';

export interface Survey {
  id?: number;
  user: UserModel;
  title: string;
  description?: string;
  questions: Question[];
  isActive?: boolean;
  dateCreated?: Date;
  // Propiedad para mostrar si el usuario ya respondió la encuesta
  hasAnswered?: boolean;
}

export interface Question {
  id?: number;
  text: string;
  options?: string[];
  type?: 'text' | 'multiple_choice';
  surveyId?: number;
}

export interface Answer {
  id: number;
  answer: string;
  dateAnswered?: Date;
  questionId: number;
  userId: number;
  surveyId?: number;
}

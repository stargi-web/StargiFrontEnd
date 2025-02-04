import { UserModel } from '../../user-management/models/userModel';

export interface Survey {
  id?: number;
  user: UserModel;
  title: string;
  description?: string;
  questions: Question[];
  isActive?: boolean;
  dateCreated?: Date;
}

export interface Question {
  text: string;
  options?: string[];
  type?: 'text' | 'multiple-choice';
  surveyId?: number;
}

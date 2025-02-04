export interface Survey {
  id?: number;
  userId: number;
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

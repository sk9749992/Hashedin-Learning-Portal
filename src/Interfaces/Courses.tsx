import { ReactNode } from "react";

export interface ICourses {
  courseId: number;
  courseName: string;
  description: string;
  tags: string[];
  author: string;
  IsWhishlisted: boolean;
  price: number;
  actualPrice: number;
  isCourseDiscounted: boolean;
}

export interface IChildren {
    children: ReactNode;  
}
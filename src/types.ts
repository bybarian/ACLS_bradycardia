export enum RhythmType {
  FIRST_DEGREE_AVB = "1st degree AV block",
  JUNCTIONAL = "Junctional bradycardia",
  MOBITZ_1 = "2nd degree AV block, Mobitz 1",
  MOBITZ_2 = "2nd degree AV block, Mobitz 2",
  AF_SVR = "Af SVR",
  SSS = "SSS",
  THIRD_DEGREE_AVB = "3rd degree AV block",
  IVR = "Idioventricular rhythm",
}

export interface QuizQuestion {
  id: string;
  rhythm: RhythmType;
  description: string;
  hint: string;
  explanation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  subtitle: string;
  teachingPoints: string[];
  characteristic: {
    speed: "慢" | "正常" | "快";
    width: "窄" | "寬";
    regularity: "規則" | "不規則";
  };
  rhythms: RhythmType[];
  quizzes: QuizQuestion[];
}

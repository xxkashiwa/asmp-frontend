export interface Alumni {
  id: number;
  studentId: string;
  name: string;
  gender: string;
  school: string;
  major: string;
  graduationYear: string;
  degree: string;
  currentCompany?: string;
  jobPosition?: string;
}

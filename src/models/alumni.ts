interface Alumni {
  id: string;
  studentId: string;
  realName: string;
  gender: 'MALE' | 'FEMALE' | 'HACHIMI';
  dateOfBirth: string;
  address: string;
  companyName: string;
  currentJob: string;
}

export const convertToAlumni = (data: any): Alumni => {
  return {
    id: data.id,
    studentId: data.studentId,
    realName: data.realName,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    address: data.address,
    companyName: data.companyName,
    currentJob: data.currentJob,
  };
};

export type { Alumni };

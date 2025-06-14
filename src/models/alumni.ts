interface Alumni {
  addedAt: string,
  studentId: string;
  realName: string;
  gender: 'MALE' | 'FEMALE' ;
  dateOfBirth: string;
  address: string;
  companyName: string;
  currentJob: string;
}

export const convertToAlumni = (data: any): Alumni => {
  return {
    addedAt: data.addedAt,
    studentId: data.studentId ?? '',
    realName: data.realName,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    address: data.address ?? '',
    companyName: data.companyName ?? '',
    currentJob: data.currentJob ?? '',
  };
};

export type { Alumni };

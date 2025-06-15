import { Alumni, convertToAlumni } from './alumni';
export interface Organization {
  id: string,
  addedAt: string;
  name: string;
  type: 'REGIONAL' | 'INDUSTRIAL' | 'INTEREST';
  description: string;
  creator: Alumni;
  state: 'DISBAND' | 'ACTIVE';
}
export const convertToOrganization = (data: any): Organization => {
  const creator = data.creator ?? {
    addedAt: '2025.5.29',
    studentId: '2023112513',
    realName: 'Sena',
    gender: 'MALE',
    dateOfBirth: '2005.05.29',
    address: 'SanTai County',
    companyName: 'None',
    currentJob: 'None',
  };
  return {
    id: data.id??'',
    addedAt: data.addedAt,
    name: data.name,
    type: data.type,
    description: data.description,
    creator: convertToAlumni(creator),
    state: data.state,
  };
};

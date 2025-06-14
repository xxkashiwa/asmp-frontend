import { Organization, convertToOrganization } from "./organization";
export interface Activity {
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    location: string,
    maxParticipants: number,
    organizer: Organization,

    status: 'NOT_STARTED' | 'STARTED' | 'FINISHED'
}

export const convertToActivity = (data: any) : Activity => {
    const organizer = data.organizer??{
        addedAt: '2025.5.29',
        name: 'Southwest Jiaotong University',
        type: 'REGIONAL',
        description: '竢实扬华,自强不息',
        creator: {
            addedAt: '2025.5.29',
            studentId: '2023112513',
            realName: 'Sena',
            gender: 'MALE',
            dateOfBirth: '2005.05.29',
            address: 'SanTai County',
            companyName: 'None',
            currentJob: 'None',
        }
    };
    return(
        {
            id: data.id??'',
            title: data.title??'',
            description: data.description??'',
            startTime: data.startTime??'',
            endTime: data.endTime??'',
            location: data.location??'',
            maxParticipants: data.maxParticipants??0,
            organizer: convertToOrganization(organizer),
            status: data.status??'NOT_STARTED',
        }
    )
}
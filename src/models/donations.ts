export interface Donations {
    id: string,
    name: string,
    description: string,
    targetAmount: number,
    currentAmount: number,
    startDate: string,
    endDate: string,
    
    status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'REFUNDED' | 'COMPLETED',
    category: string,
    imageUrl: string,
    organizer: {
        id: string,
        addedAt: string,
    },
    createdAt: string,
    updatedAt: string,  
    progress: number,
    targetReached: boolean,
};
export  const convertToDonations = (data: any): Donations => {
    return {
        id: data.id??'',
        name: data.name,
        description: data.description??'',
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount??0,
        startDate: data.startDate,
        endDate: data.endDate??'',
        status: data.status??'PENDING',
        category: data.category??'',
        imageUrl: data.imageUrl,
        organizer: data.organizer??{
            id: data.organizer.id??'',
            addedAt: data.organizer.addedAt,
        },
        createdAt: data.createdAt??'',
        updatedAt: data.updatedAt??'',
        progress: data.progress??0,
        targetReached: data.targetReached??false,
    }
}

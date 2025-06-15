export interface Enterprise {
    id: string,
    addedAt: string,
    name: string,
    field: string,
    address: string,
    contactPerson: string,
    contactEmail: string,
    contactPhone: string,
}
export const convertToEnterprise = (data: any) : Enterprise => {
    return(
        {
            id: data.id??'',
            addedAt: data.addedAt,
            name: data.name??'',
            field: data.field??'',
            address: data.address??'',
            contactPerson: data.contactPerson??'',
            contactEmail: data.contactEmail??'',
            contactPhone: data.contactPhone??'',
        }
    )
}
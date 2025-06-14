import request from '@/lib/request';
import { Organization, convertToOrganization } from '@/models/organization';

const endPoint = '/organization';

export const getAllOrganizations = async () => {
    const response = await request({
        url: `${endPoint}`,
        method: 'GET',
    });
    const datas = response.data.map((item: any) => convertToOrganization(item));
    return datas as Organization[];
}

export const getOrganizationById = async (id: number) => {
    const response = await request({
        url: `${endPoint}/${id}`,
        method: 'GET',
    });
    const data = convertToOrganization(response.data);
    return data as Organization;
}
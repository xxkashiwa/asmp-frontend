import request from '@/lib/request';
import { Activity, convertToActivity } from '@/models/activity';
const endPoint = '/activity';

export const getAllActivity = async () => {
  const response = await request({
    url: `${endPoint}`,
    method: 'GET',
  });
  const datas = response.data.map((data: any) => convertToActivity(data));
  return datas as Activity[];
};
export const getActivityById = async (id: string) => {
  const response = await request({
    url: `${endPoint}/${id}`,
    method: 'GET',
  });
  return convertToActivity(response.data);
};

import request from '@/lib/request';
import { Alumni, convertToAlumni } from '@/models/alumni';
const endPoint = '/alumni';

const getAllAlumni = async () => {
  const response = await request({
    url: `${endPoint}`,
    method: 'GET',
  });
  const datas = response.data.map((data: any) => convertToAlumni(data));
  return datas as Alumni[];
};

const getAlumniById = async (id: string) => {
  const response = await request({
    url: `${endPoint}/${id}`,
    method: 'GET',
  });
  return convertToAlumni(response.data) as Alumni;
};

export { getAllAlumni, getAlumniById };

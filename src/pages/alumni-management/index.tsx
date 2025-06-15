/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alumni } from '@/models/alumni';
import useAlumniStore from '@/stores/alumni-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { AlumniTable } from './components/alumni-table/alumni-table';

const AlumniManagement: React.FC = () => {
  const { alumniList, fetchAlumniList } = useAlumniStore();
  useEffect(() => {
    fetchAlumniList().catch(error => {
      console.error('Failed to fetch alumni data', error);
      toast.error('获取校友数据失败');
    });
  }, [fetchAlumniList]);

  const handleAddAlumni = async (data: Alumni): Promise<void> => {
    try {
      toast.success('添加校友成功');
    } catch (error) {
      console.error('Failed to add alumni', error);
      toast.error('添加校友失败');
    }
  };

  const handleEditAlumni = async (
    studentId: string,
    data: Alumni
  ): Promise<void> => {
    try {
      toast.success('更新校友信息成功');
    } catch (error) {
      console.error('Failed to update alumni', error);
      toast.error('更新校友信息失败');
    }
  };
  const handleDeleteAlumni = async (studentId: string): Promise<void> => {
    try {
      toast.success('删除校友成功');
    } catch (error) {
      console.error('Failed to delete alumni', error);
      toast.error('删除校友失败');
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">校友管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友信息、校友档案、联系方式等内容
        </p>

        {alumniList.length === 0 ? (
          ''
        ) : (
          <AlumniTable
            data={alumniList}
            onAddAlumni={handleAddAlumni}
            onEditAlumni={handleEditAlumni}
            onDeleteAlumni={handleDeleteAlumni}
          />
        )}
      </div>
    </div>
  );
};

export default AlumniManagement;

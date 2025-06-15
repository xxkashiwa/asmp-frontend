import { getAllAlumni } from '@/services/alumni-service';
import useAlumniStore from '@/stores/alumni-store';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AlumniManagement: React.FC = () => {
  // 使用 Zustand store 代替局部状态
  const {
    alumniList,
    loading,
    fetchAlumniList,
    addAlumni,
    updateAlumni,
    deleteAlumni,
  } = useAlumniStore();

  useEffect(() => {
    // 组件挂载时从 store 获取数据
    fetchAlumniList().catch(error => {
      console.error('Failed to fetch alumni data', error);
      toast.error('获取校友数据失败');
    });
  }, [fetchAlumniList]);

  useEffect(() => {
    getAllAlumni().then(data => {
      console.log('Fetched alumni data:', data);
    });
  }, []);

  const handleAddAlumni = async (data: Omit<(typeof alumniList)[0], 'id'>) => {
    try {
      await addAlumni(data);
      toast.success('添加校友成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to add alumni', error);
      toast.error('添加校友失败');
      return Promise.reject(error);
    }
  };

  const handleEditAlumni = async (
    id: number,
    data: Omit<(typeof alumniList)[0], 'id'>
  ) => {
    try {
      await updateAlumni(id, data);
      toast.success('更新校友信息成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update alumni', error);
      toast.error('更新校友信息失败');
      return Promise.reject(error);
    }
  };

  const handleDeleteAlumni = async (id: number) => {
    try {
      await deleteAlumni(id);
      toast.success('删除校友成功');
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to delete alumni', error);
      toast.error('删除校友失败');
      return Promise.reject(error);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <h1 className="mb-6 text-2xl font-bold">校友管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友信息、校友档案、联系方式等内容
        </p>

        {/* {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p>加载中...</p>
          </div>
        ) : (
          <AlumniTable
            data={alumniList}
            onAddAlumni={handleAddAlumni}
            onEditAlumni={handleEditAlumni}
            onDeleteAlumni={handleDeleteAlumni}
          />
        )} */}
      </div>
    </div>
  );
};

export default AlumniManagement;

import React from 'react';

const AlumniManagement: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold">校友管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理校友信息、校友档案、联系方式等内容
        </p>

        {/* 这里可以添加校友管理的具体内容，如表格、搜索框等 */}
        <div className="rounded-md border p-4">
          <p>校友列表将在此显示</p>
        </div>
      </div>
    </div>
  );
};

export default AlumniManagement;

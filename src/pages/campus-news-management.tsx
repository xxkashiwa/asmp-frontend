import React from 'react';

const CampusNewsManagement: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold">高校动态管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理学校新闻、政策变动、发展规划等信息
        </p>

        {/* 这里可以添加高校动态管理的具体内容 */}
        <div className="rounded-md border p-4">
          <p>高校动态信息将在此显示</p>
        </div>
      </div>
    </div>
  );
};

export default CampusNewsManagement;

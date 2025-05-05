import React from 'react';
const Home: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold">数据分析</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          校友数据统计、趋势分析、报表生成等功能
        </p>

        {/* 这里可以添加数据分析的具体内容，如图表等 */}
        <div className="rounded-md border p-4">
          <p>数据分析图表将在此显示</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

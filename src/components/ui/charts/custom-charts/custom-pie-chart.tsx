import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/charts/custom-chart';

interface PieData {
    name: string;
    value: number;
    color: string;
}

interface PieChartProps {
    data: PieData[];
    className?: string;
    loading?: boolean;
    innerRadius?: number;      // 内圆半径
    outerRadius?: number;      // 外圆半径
    showLabel?: boolean;       // 是否显示标签
    showValue?: boolean;       // 是否显示数值
    formatter?: (value: number) => string;  // 数值格式化函数
}

export const CustomPieChart = ({
    data,
    className,
    loading,
    innerRadius = 60,
    outerRadius = 80,
    showLabel = true,
    showValue = true,
    formatter = (value) => `${(value * 100).toFixed(2)}%`,
}: PieChartProps) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <ChartContainer className={className} loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart >
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={90}
                        endAngle={450}
                        label={({ name, value }) => {
                            if (!showLabel) return null;
                            const percentage = (value / total) * 100;
                            return `${name} ${percentage.toFixed(2)}%`;
                        }}
                        labelLine={showLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    {showValue && data.length > 0 && (
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-3xl font-bold fill-white"
                        >
                            {formatter(data[0].value / total)}
                        </text>
                    )}
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
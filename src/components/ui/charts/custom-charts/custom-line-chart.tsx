import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid,ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartLegend, ChartTooltip  } from '@/components/ui/charts/custom-chart';


interface LineData {
    [key: string]: string | number;  // 动态键值对，支持多个数据系列
}

interface LineChartProps {
    data: LineData[];
    className?: string;
    loading?: boolean;
    xField: string;  // X轴字段名
    series: {
        key: string;   // 数据字段名
        name: string;   // 显示名称
        color: string;  // 柱子颜色
    }[];
    height?: number | string;  // 图表高度
    formatter?: (value: number, name: string) => string;  // 数值格式化函数
    showGrid?: boolean;       // 是否显示网格线
    showLegend?: boolean;     // 是否显示图例
}

export const CustomLineChart = ({
    data,
    className,
    loading,
    xField,
    series,
    height = 300,
    formatter,
    showGrid = true,
    showLegend = true,
}: LineChartProps) => {
    return(
        <ChartContainer className = {className} loading = {loading}>
            <ResponsiveContainer height={height}>
                <LineChart data={data}>
                    {showGrid && (<CartesianGrid
                        strokeDasharray = "3 3"
                        className='stroke-muted/20'
                    />)}
                    <XAxis 
                        dataKey = {xField}
                        className='text-xs text-white'
                        tickLine = {false}
                        axisLine = {false}
                    />
                    <YAxis 
                        className='text-xs text-white'
                        tickLine = {false}
                        axisLine = {false}
                    />
                    <Tooltip 
                        content = {<ChartTooltip  formatter={formatter}/>}
                    />
                    {showLegend &&<ChartLegend items={series.map((item)=>{
                        return{
                            name: item.name,
                            color: item.color,
                        }
                    })}/>}
                    {series.map((item)=>(
                        <Line 
                            key={item.key}
                            dataKey={item.key}
                            name={item.name}
                            stroke={item.color}
                            fill={item.color}
                            dot={{ stroke: item.color, strokeWidth: 2, fill: item.color }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
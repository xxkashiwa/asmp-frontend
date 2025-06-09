import { cn } from '@/lib/utils';
interface ChartContainerProps {
    children: React.ReactNode;
    className?: string;
    loading?: boolean;
}

export const ChartContainer = ({
    children,
    className,
    loading
}: ChartContainerProps) =>{
    return (
        <div className={cn(
            'relative w-full h-full min-h-[300px] p-4 rounded-lg boarder boarder-border bg-[#0A1526]',className
        )}>
            {loading&&(
                <div
                    className='absolute inset-0 flex items-center justify-center bg-background/50 z-10'
                >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"/>
                </div>
            )}
            {children}
        </div>
    )
}
interface ChartLegendProps{
    items:{
        name: string;
        color: string;
    }[];
}

export const ChartLegend = ({
    items
}: ChartLegendProps)=>{
    return(
        <div className="flex flex-wrap gap-4 mt-4">
            {items.map((item)=>(
                <div 
                    key={item.name}
                    className='flex items-center gap-2'
                >
                    <div 
                        className='w-3 h-3 rounded-full'
                        style = {{backgroundColor: item.color}}
                    />
                    <span className='text-sm text-white'>{item.name}</span>
                </div>
            ))}
        </div>
    );
};

interface ChartTooltipProps{
    active?: boolean;
    payload?: any[];
    label?: string;
    formatter?: (value: any, name: string)=>string;
    labelFormatter?: (label: string | undefined )=>string;
}

export const ChartTooltip = ({
    active,
    payload,
    label,
    formatter,
    labelFormatter
}: ChartTooltipProps)=>{
    if(!active || !payload?.length){
        return null;
    }
    return(
        <div className='bg-popover/90 p-3 rounded-lg shadow-lg border border-border'>
            <p className="text-sm font-medium text-white mb-2">
                {labelFormatter? labelFormatter(label) : label}
            </p>
            {payload.map((entry)=>(
                <div key={entry.name} className="flex items-center gap-2">
                    <div 
                        className='w-2 h-2 rounded-full'
                        style={{backgroundColor: entry.color}}
                    />
                    <span className='text-sm text-white'>{entry.name}:</span>
                    <span className='text-sm font-medium text-white'>
                        {formatter? formatter(entry.value, entry.name): entry.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

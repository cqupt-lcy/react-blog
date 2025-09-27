import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

const BarChart = ({title}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['React', 'Vue', 'Angular'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [620, 200, 50],
                    type: 'bar'
                }
            ]
        }
        myChart.setOption(option);
    }, [title])
    return (
        <div>
            <div className='main' style={{ width: '500px', height: '400px' }} ref={chartRef}>
            </div>
        </div>
    )
}
export default BarChart
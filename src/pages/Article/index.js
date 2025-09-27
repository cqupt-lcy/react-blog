import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn';
import QueryList from './components/QueryList';
import { useChannelList } from '@/hooks/useChannelList';
import { useState } from 'react';
const { RangePicker } = DatePicker
const { Option } = Select
const Article = () => {
    const [queryState, setQueryState] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: '1',
        per_page: '10'
    })
    const handleFinish = (formData) => {
        setQueryState({
            ...queryState,
            status: formData.status,
            channel_id: formData.channel_id,
            begin_pubdate: formData.date ? formData.date[0].format('YYYY-MM-DD') : '',
            end_pubdate: formData.date ? formData.date[1].format('YYYY-MM-DD') : '',
        })
    }
    const { channelList } = useChannelList();
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={handleFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => <Option value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale} ></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <QueryList formdata={queryState} />

        </div>
    )
}

export default Article
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { Tag, Space, Button, Card, Table, Popconfirm } from 'antd'
import useArticleList from '@/hooks/useArticleList'
import { useEffect, useState } from 'react'
import { delArticleAPI } from '@/apis/article'
import { useNavigate } from 'react-router-dom'
const QueryList = ({ formdata }) => {
    const navigate = useNavigate();
    const [params, setParams] = useState(formdata);
    const { articleList, count, refetch } = useArticleList(params);
    const { per_page } = formdata
    useEffect(() => {
        setParams(formdata);
    }, [formdata])
    const onPageChange = (page) => {
        setParams({ ...params, page });
    }
    const delArticle = async (id) => {
        await delArticleAPI(id);
    }
    const onConfirm = async (data) => {
        await delArticle(data.id);
        refetch();
    }

    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
                        <Popconfirm
                            title="删除文章"
                            description="确认要删除当前文章吗？"
                            onConfirm={() => onConfirm(data)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}

                            />
                        </Popconfirm>
                    </Space >
                )
            }
        }
    ]
    // 准备表格body数据
    return (
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`} >
            <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
                total: count,
                pageSize: per_page,
                onChange: onPageChange,
            }} />
        </Card>
    )
}

export default QueryList;
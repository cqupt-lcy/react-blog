import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useChannelList } from '@/hooks/useChannelList'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useEffect, useState } from 'react'
const { Option } = Select
const Publish = () => {
    const navigate = useNavigate();
    const { channelList } = useChannelList();
    const [imageList, setImageList] = useState([]);
    const [type, setType] = useState(0);
    const [searchParams] = useSearchParams();
    const [form] = Form.useForm();
    const [pageType, setPageType] = useState('发布文章');
    const articleId = searchParams.get('id');
    useEffect(() => {
        async function getArticleDetial() {
            const { data } = await getArticleById(articleId);
            const { cover } = data
            form.setFieldsValue({
                ...data,
                type: cover.type,
                image: cover.images,
            });
            setType(cover.type);
            setImageList(cover.images.map(url => { return { url } }));
        }
        if (articleId) {
            getArticleDetial();
            setPageType('编辑文章')
        }
    }, [articleId, form])
    const handleFinish = async (value) => {
        if (imageList.length !== type) return message.warning('图片数量不匹配!')
        const reqData = {
            ...value, cover: {
                type: type,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url;
                    } else {
                        return item.url;
                    }
                }),
            },
        }
        let response = {};
        if (articleId) {
            response = await updateArticleAPI({ ...reqData, id: articleId })
        } else {
            response = await createArticleAPI(reqData)
        }
        if (response.message === 'OK') {
            message.success('修改成功!');
            navigate('/article');
        } else {
            message.error('修改失败，请重试!');
        }

    }
    const onChange = (value) => {
        console.log('上传中...', value);
        setImageList(value.fileList);
    }
    const onTypeChange = (item) => {
        setType(item.target.value);
    }
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: pageType },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type }}
                    onFinish={handleFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map((item, index) => <Option value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {type !== 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={type}
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            theme='snow'
                            className='publish-quill'
                            placeholder='请输入文章内容'
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish
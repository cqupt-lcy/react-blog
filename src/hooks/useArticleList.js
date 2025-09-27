import { useState, useEffect } from "react";
import { getArticleListAPI } from "@/apis/article";
const useArticleList = (data) => {
    const [articleList, setArticleList] = useState([]);
    const [count, setCount] = useState(0);
    const fetchArticleList = async (data) => {
        const res = await getArticleListAPI(data);
        setArticleList(res.data.results);
        setCount(res.data.total_count);
    }
    const refetch = () => {
        fetchArticleList(data);
    }
    useEffect(() => {
        fetchArticleList(data);
    }, [data]);
    return { articleList, count, refetch }
}
export default useArticleList;
const { getChannelAPI } = require("@/apis/article");
const { useState, useEffect } = require("react")

const useChannelList = () => {
    const [channelList, setChannelList] = useState([]);
    const fetchChannelList = async () => {
        const res = await getChannelAPI();
        setChannelList(res.data.channels);
    }
    useEffect(() => {
        fetchChannelList();
    }, []);
    return {
        channelList
    }
}
export { useChannelList };
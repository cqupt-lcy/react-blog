const { request } = require("@/utils")

const getChannelAPI = () => {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

const createArticleAPI = (data) => {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

const updateArticleAPI = (data) => {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}

const getArticleListAPI = (params) => {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

const delArticleAPI = id => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE',
    })
}

const getArticleById = id => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}
export { getChannelAPI, createArticleAPI, getArticleListAPI, delArticleAPI, getArticleById, updateArticleAPI }
import { request } from "@/utils"

const loginAPI = (loginForm) => {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: loginForm
    })
}

const userInfoAPI = () => {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}

export { loginAPI, userInfoAPI };
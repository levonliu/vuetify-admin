import request from '@/utils/request'

/**
 * 登录
 * @param data
 */
export const login = (data) => {
    return request({
        url : 'login',
        method : 'post',
        data
    })
}

export const user = () => {
    return request({
        url : 'user',
        method : 'get',
    })
}

/**
 * 获取菜单
 */
export const menu = () => {
    return request({
        url: 'menu',
        method: 'get',
    })
}
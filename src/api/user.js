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

/**
 * 获取菜单
 * @param data
 */
export const menu = (data) => {
    return request({
        url: 'menu',
        method: 'get',
    })
}
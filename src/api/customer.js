import request from '@/utils/request'

/**
 * 客户列表
 */
export const customerList = () => {
    return request({
        url : '/customer',
        method : 'get'
    })
}
import request from '@/utils/request'

/**
 * 客户列表
 */
export const customerSave = (data) => {
    return request({
        url : '/customer'+data.id,
        method : 'post'
    })
}
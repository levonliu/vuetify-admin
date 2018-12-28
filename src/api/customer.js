import request from '@/utils/request'

/**
 * 客户新增/编辑
 */
export const customerSave = (data) => {
    let url = '/customer'
    let method = 'post'
    if(data.id) {
        url = url+'/'+data.id
        method = 'patch'
    }
    return request({
        url: url,
        method: method,
        data: data,
    })
}

/**
 * 客户删除
 * @param data
 */
export const customerDel = (id) => {
    return request({
        url: '/customer/'+id,
        method: 'delete',
    })
}
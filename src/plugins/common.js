import store from  '../store/index';

export default {
    install : function(Vue, options) {
        /**
         * 深度拷贝数组和对象, 浅度拷贝不要使用这个方法，性能消耗严重
         *
         * @param source
         * @returns {*}
         */
        Vue.prototype.$deepCopy = (source)=>{
            var sourceCopy = source instanceof Array ? [] : {};
            sourceCopy = JSON.parse(JSON.stringify(source));
            return sourceCopy;
        }

        /**
         * 操作权限检查
         *
         * @param checkRules
         * @returns {boolean}
         */
        Vue.prototype.$checkAuth = (checkRules)=>{
            const userRules = store.state.app.user.rules;

            checkRules.forEach(function (item, index) {
                checkRules[index] = item.toLowerCase();
            })
            // 检查是否有权限
            const hasPermission = checkRules.some(rule => {
                return userRules.includes(rule)
            })
            return hasPermission;
        }
    }
}
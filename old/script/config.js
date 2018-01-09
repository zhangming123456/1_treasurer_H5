(function (window) {
    /**
     * 配置文件
     */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

    var host = "http://192.168.134.2:8082/api";

    var config = {

        // 下面的地址配合云端 Server 工作
        host: host,

        // 登录地址，用于建立会话
        loginUrl: "",

        // 测试的请求地址，用于测试会话
        requestUrl: "",

        // 用code换取openId
        openIdUrl: "",

        // 测试的信道服务接口
        tunnelUrl: "",

        // 生成支付订单的接口
        paymentUrl: "",

        // 发送模板消息接口
        templateMessageUrl: "",

        // 上传文件接口
        uploadFileUrl: "",

        // 下载示例图片接口
        downloadExampleUrl: ""
    };

    window.HTTP_Config = config;
})(window);
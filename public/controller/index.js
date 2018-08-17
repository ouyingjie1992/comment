(function() {
    'use strict';

    var moudle = (function() {
        var init = function() {
            // 页面初始化渲染
            render();
            // 事件处理
            bindEvents();

            var urlS = decodeURI(window.location.hash.substring(window.location.hash.lastIndexOf('?') + 1));
            //拿地址栏参数 ?type=mySurvey
            if(urlS.indexOf("type")!=-1)
            {
                var searchc = urlS.split("=");
                var tab = searchc[1];
                if(tab == "mySurvey") {
                    $('li[data-tabid="main-content-survey"]').click();
                }
            }
        };
        // 页面初始化渲染
        var render = function() {
            initComment();
        };
        // 事件处理
        var bindEvents = function() {
        };
        // 初始化评论插件
        var initComment = function () {
            $('#myComment').loadComment({
                url1: '/api/userNameSearch', 
                url2: '/api/bondNameSearch',
                url3: '/api/getThemeBySearch',
                // url4: app.services.right.checkUserInfo,
                uploadUrl: '/api/uploadImg',
                savePostDataInfo: '/api/savePostDataInfo',
                type: 1,
                // maskMessage: '请先完成身份认证信息，即可发布帖子，<a href="#setting/settingregister1">立即认证</a>',
                // maskMessage2: '请先完成身份认证信息，即可发布帖子，<a href="#setting/orgregister1">立即认证</a>',
                callBack: function(data) {
                    alert('发布成功！');
                },
                isCountLength: 1
            });
        };
        return {
            init : init,
        };
    })();
    moudle.init();
    moudle = null;
})();
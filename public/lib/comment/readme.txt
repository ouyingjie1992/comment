1、依赖js包: jquery.js
2、使用前引用: 
<link rel="stylesheet" href="comment/comment.css">
<script src="comment/comment.js"></script>
3、引入代码:
html:
	<!-- 需自行定义宽高 -->
	<div id="id"></div>
js:
	
    $('#id').loadComment(
        {
            url1: '', //@查询接口
            url2: '', //$查询接口
            url3: '', //#查询接口
            url4: '', //查询权限接口
            uploadUrl: '', //上传图片接口
            savePostDataInfo: '', //发布帖子
            type: 1, //评论类型 1是原创，2是转发
            isForward: '', //是否带转发功能 0||1
            postId: 1, //转发需配参数-被转发的原贴id.
            callBack: function(){} //成功回调函数
            commentId: 1, //评论的回复需配参数-被评论的id.
            surveyId: 1, //调研id，如果是提问和回答则需要传参
            maskMessage: '', //无权限时展示文案
            isCountLength: 0 //是否带字数提示 0不带 1带
        },
        function() {
        //回调函数
        }
    );


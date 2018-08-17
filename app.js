var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 加载
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/view/index.html');
});
 
//  POST 请求
//  @查询用户名
app.post('/api/userNameSearch', urlencodedParser, function (req, res) {
    // console.log(req.body);
    // 模拟接口
    var response = {
        "code": "5000",
        "message": "成功",
        "data": {
        	"items": []
        }
    };
    for(var i=0; i<5; i++) {
    	var item = {
    		"userId": i,
    		"userName": req.body.userName+i
    	};
    	response.data.items.push(item);
    }
    res.send(response);
});
// $查询债券/发行人信息
app.post('/api/bondNameSearch', urlencodedParser, function (req, res) {
    // 模拟接口
    var response = {
        "code": "5000",
        "message": "成功",
        "data": {
        	"items": []
        }
    };
    for(var i=0; i<5; i++) {
    	var item = {};
    	if(i>3) {
			item = {
	    		"isBondOrIssuer": 0,
	    		"sInfoWindcode": "sInfoWindcode"+i,
	    		"sInfoName": req.body.search+i
	    	};
    	} else {
			item = {
	    		"isBondOrIssuer": 1,
	    		"issuerId": "issuerId"+i,
	    		"sInfoCompname": req.body.search+i
	    	};
    	}
    	response.data.items.push(item);
    }
    res.send(response);
});
// #查询话题
app.post('/api/getThemeBySearch', urlencodedParser, function (req, res) {
    // 模拟接口
    var response = {
        "code": "5000",
        "message": "成功",
        "data": {
        	"items": []
        }
    };
    for(var i=0; i<5; i++) {
    	var item = {};
		item = {
    		"id": i,
    		"themeName": req.body.search+i
    	};
    	response.data.items.push(item);
    }
    res.send(response);
});
// 发布
app.post('/api/savePostDataInfo', urlencodedParser, function (req, res) {
    // 模拟接口
    var response = {
        "code": "5000",
        "message": "成功",
        "data": {}
    };
    res.send(response);
});
 
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
 
});
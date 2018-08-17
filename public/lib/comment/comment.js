/**
 * 联合-债券定制评论组件
 * from ouyj@lhcis.com
 * 2018-04-04
 * 基于jQuery&bootstrap&summernote
 */
(function ($) {
	'use strict';
	// 引入插件入口
	// option={
	// 	url1: '', //@查询接口
    //  url2: '', //$查询接口
    //  url3: '', //#查询接口
    //  url4: '', //查询权限接口
    //  uploadUrl: '', //上传图片接口
    //  savePostDataInfo: '', //发布帖子
    //  type: 1, //评论类型 1是原创，2是转发
    //  isForward: '', //是否带转发功能 0||1
    //  postId: 1, //转发需配参数-被转发的原贴id.
    //  callBack: function(){} //成功回调函数
    //  commentId: 1, //评论的回复需配参数-被评论的id.
    //  surveyId: 1, //调研id，如果是提问和回答则需要传参
    //  maskMessage: '', //无权限时展示文案
    //  isCountLength: 0 //是否带字数提示 0不带 1带
	// }
    $.fn.loadComment = function(option){
        var $this = $(this);
        var $content = $this;
        var timestamp = new Date().getTime();
        // var url = '/bond/bondForum/getUserSearch';
        var _url = option.url1,
        	_url2 = option.url2,
            _url3 = option.url3,
            _url4 = option.url4,
            _uploadUrl = option.uploadUrl,
            _saveDataUrl = option.savePostDataInfo,
            _postId = 1,
            _commentId = 1,
            _surveyId,
            _isCountLength = 0;
        var _pop = '#pop' + timestamp,
            _edit = '#edit' + timestamp,
            _edit2 = 'edit' + timestamp,
            _editHidden = '#edit' + timestamp + '-hidden';
        // 内容发布类型 1是原创，2是转发, 3评论
        var _contentType = 1;
        if(option.type != null) {
            _contentType = option.type;
        }
        // 是否带转发功能
        var _isForward = 0;
        // console.log(option)
        if(option.isForward != null) {
            _isForward = option.isForward;
        }
        var _maxNumber = 9;
        if(_contentType == 1) {
            _maxNumber = 9;
        } else {
            _maxNumber = 1;
        }
        if(option.postId != null) {
            _postId = option.postId;
        }
        if(option.commentId != null) {
            _commentId = option.commentId;
        }
        if(option.surveyId != null) {
            _surveyId = option.surveyId;
        }
        if(option.isCountLength != null) {
            _isCountLength = option.isCountLength;
        }

        // 成功回调函数
        if ("function" == typeof(option.callBack)) {
            var successCallBack = option.callBack;
        }

        var html = '';
        html += '<div class="comment-mask"></div>';
        html += '<div class="comment-main">';
        html +=     '<textarea id="edit' + timestamp + '" class="comment-textarea" placeholder="说点什么..."></textarea><div id="edit' + timestamp + '-hidden" class="comment-textarea comment-textarea-hidden"></div><div id="pop' + timestamp + '" class="comment-pop lh-comment-ul"></div>';
        if(_isCountLength == 1) {
            html += '<div class="textarea-message"><span class="textarea-words">已输入</span><span class="textarea-length">1</span>字</div>';
        }
        html += '</div>';
        html += '<div class="functionBtns">';
        // html +=     '<a class="functionBtn insertUser">@</a>';
        html +=     '<a class="functionBtn insertBond"><div class="symbol-icon"></div><span class="btnTitle">债券/发行人</span></a>';
        html +=     '<a class="functionBtn insertTheme"><div class="symbol-icon"></div><span class="btnTitle">话题</span></a>';
        html +=     '<a class="functionBtn insertImg"><div class="symbol-icon"></div>&nbsp;<span class="num_totla num_totla-first">(0)</span><span class="btnTitle">图片</span></a>';

        if(_isForward == 1) {
            if(_contentType == 2) {
                html +=     '<label for="forword_' + timestamp + '" class="isForward">';
                html +=         '<input id="forword_' + timestamp + '" class="isForward_checkbox" type="checkbox" name="isComment"><span>同时评论</span>';
                html +=     '</label>';
            } else {
                html +=     '<label for="forword_' + timestamp + '" class="isForward">';
                html +=         '<input id="forword_' + timestamp + '" class="isForward_checkbox" type="checkbox" name="forward"><span>同时转发</span>';
                html +=     '</label>';
            }
        }
        if(_contentType == 1 || _contentType == 2) {
            html +=     '<a class="functionBtn publishBtn">发布</a>';
            html +=     '<label for="anonymity_' + timestamp + '" class="isAnonymity"><input id="anonymity_' + timestamp + '" class="isAnonymity_checkbox" type="checkbox" name="isAnonymity"><span>匿名发帖</span></label>';
        } else {
            html +=     '<a class="functionBtn publishBtn">发布</a>';
            html +=     '<label for="anonymity_' + timestamp + '" class="isAnonymity"><input id="anonymity_' + timestamp + '" class="isAnonymity_checkbox" type="checkbox" name="isAnonymity"><span>匿名发布</span></label>';
        }
        html +=     '<div class="insertImgDiv">';
        html +=         '<div class="insertImgDivContent">';
        html +=             '<div><a href="javascript:void(0)" node-type="close" class="ficon_close">X</a></div>';
        html +=             '<div class="layer_pic_list">';
        html +=                '<div class="layer_con_tit">';
        html +=                    '<h1 class="layer_fb">本地上传</h1>';
        html +=                    '<h2 class="layer_fb2">';
        html +=                        '<span class="tit_txtl">共<em class="num_totla">0</em>张，还能上传<em class="num_totla">';
        if(_contentType == 2) {
            html += _maxNumber;
        } else {
            html += _maxNumber;
        }
        html +=                         '</em>张</span>';
        html +=                    '</h2>';
        html +=                '</div>';
        html +=                '<ul class="drag_pic_list">';
        // html +=                    '<li class="pic">';
        // html +=                        '<div class="pic-main" style=""></div>';
        // html +=                        '<span class="picbg"><a class="ico_delpic"></a></span>';
        // html +=                    '</li>';
        html +=                    '<li class="add">';
        html +=                        '<a calss="upload_icon_add">+</a>';
        html +=                        '<div class="add_main">';
        html +=                            '<form class="add_form" enctype="multipart/form-data" method="POST">';
        html +=                                '<input type="file" name="file"  accept="image/jpg,image/jpeg,image/png,image/gif" class="add_form_input">';
        html +=                             '</form>';
        html +=                         '</div>';
        html +=                     '</li>';
        html +=                 '</ul>';
        html +=             '</div>';
        html +=         '</div>';
        html +=         '<div class="insertImgDivArrow">';
        html +=             '<span class="arrow_bor">';
        html +=                 '<i class="arrow_line"></i><em class="row_bg_br"></em>';
        html +=             '</span>';
        html +=         '</div>';
        html +=     '</div>';
        html += '</div>';
        $content.html(html);

        var $textarea = $(_edit), 
            $div = $(_editHidden), 
            $pop = $(_pop),
            $insertImg = $this.find('.insertImg'),
            $insertUser = $this.find('.insertUser'),
            $insertBond = $this.find('.insertBond'),
            $insertTheme = $this.find('.insertTheme'),
            $publishBtn = $this.find('.publishBtn');

        // 定义最后光标对象
        var lastEditRange,
        lastEditRange2=0;

        $textarea.on('focus', function() {
            // posCursor();
            window.activeobj = this;
            this.clock = setInterval(function(){
                if(activeobj.scrollHeight > 50) {
                    activeobj.style.height = activeobj.scrollHeight+'px';
                }
            },1);
            countLength();
        }).on('blur', function() {
            setTimeout(function() {
                $pop.hide();
            },1000);
            clearInterval(this.clock);
            isNull();
            countLength();
        }).on('input propertychange', function(e) {
            var value = $textarea.val();
            var htmlValue = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            var prevStr = value.substring(0, e.originalEvent.srcElement.selectionStart);
            var nextStr = value.substring(e.originalEvent.srcElement.selectionStart);
            lastEditRange = e.originalEvent.srcElement.selectionStart;
            isNull();
            
            var symbol = '@';
            var symbol2 = '$';
            if(prevStr.lastIndexOf('@') < prevStr.lastIndexOf('$')) {
                symbol = '$';
            }
            if(prevStr.lastIndexOf(symbol) < prevStr.lastIndexOf('#')) {
                symbol = '#';
            }
            if(nextStr.indexOf('@') > nextStr.indexOf('$')) {
                symbol2 = '$';
            }
            if(nextStr.indexOf(symbol2) > nextStr.indexOf('#')) {
                symbol2 = '#';
            }

            htmlValue = htmlValue.replace(/@/g, '<span class="comment-special-symbol">@</span>');
            htmlValue = htmlValue.replace(/\$/g, '<span class="comment-special-symbol2">$</span>');
            htmlValue = htmlValue.replace(/#/g, '<span class="comment-special-symbol3">#</span>');
            htmlValue = htmlValue.replace(/\n/g, '<br>');
            $div.html(htmlValue);
            if(e.originalEvent.data === '@') {
                showPop('@', prevStr);
            } else if(e.originalEvent.data === ' '){
                $pop.hide();
            } else if(e.originalEvent.data === '$') {
                showPop('$', prevStr);
            } else if(e.originalEvent.data === '#') {
                showPop('#', prevStr);
            } else {
                var valueStr = '';
                if(prevStr.lastIndexOf(symbol) == -1 || prevStr.lastIndexOf(' ')>prevStr.lastIndexOf(symbol)) {
                    $pop.hide();
                    return false;
                }
                if(value.indexOf(symbol) > -1) {
                    var tempStr1 = prevStr.replace(/\n/g, ' ');
                    var tempStr2 = nextStr.replace(/\n/g, ' ');
                    if(tempStr1.indexOf(symbol) > -1) {
                        tempStr1 = tempStr1.substring(tempStr1.lastIndexOf(symbol)+1);
                    } else {
                        tempStr1 = '';
                    }
                    if(tempStr2.indexOf(symbol2) > -1) {
                        tempStr2 = tempStr2.substring(0, tempStr2.indexOf(symbol2)-1);
                    }
                    if(tempStr1.indexOf(' ') > -1) {
                        tempStr1 = '';
                    }
                    if(tempStr2.indexOf(' ') > -1) {
                        tempStr2 = '';
                    }
                    valueStr = tempStr1 + tempStr2;
                }
                // console.log(valueStr);
                // if(valueStr!='' && valueStr!=null) {
                    if(symbol == '@' && (prevStr.lastIndexOf(' ')<prevStr.lastIndexOf('@'))) {
                        showPop('@', prevStr, valueStr);
                    } else if(symbol == '$' && (prevStr.lastIndexOf(' ')<prevStr.lastIndexOf('$'))) {
                        showPop('$', prevStr, valueStr);
                    } else if((valueStr!='' && valueStr!=null)) {
                        showPop('#', prevStr, valueStr);
                    }
                // }
                // console.log(prevStr);
                // console.log(nextStr);
            }

            countLength();
        }).on('keydown', function() {
            posCursor();
            countLength();
        }).on('keyup', function() {
            posCursor();
            countLength();
        }).on('mousedown', function() {
            posCursor();
            countLength();
        }).on('mouseup', function() {
            posCursor();
            countLength();
        }).on('mouseup', function() {
            posCursor();
            countLength();
        });
        $textarea.focus();
        // 检测权限
        if(_url4 != null) {
            checkUserInfo();
        }

        // 判断textare是否为空
        function isNull() {
            if(($textarea.val() == null || $textarea.val() == '') && $content.find('.drag_pic_list li.pic').length == 0) {
                $publishBtn.removeClass('able');
            } else {
                $publishBtn.addClass('able');
            }
            
        }

        // 显示当前内容长度
        function countLength() {
            if($content.find('.textarea-length').length > 0) {
                var textareaLength = $content.find('.comment-textarea').val().length;
                if(textareaLength <= 0) {
                    $content.find('.textarea-message').hide();
                } else {
                    $content.find('.textarea-message').show();
                }
                if(textareaLength > 500) {
                    $content.find('.textarea-words').html('已超出');
                    $content.find('.textarea-length').addClass('textarea-over-length').html(textareaLength-500);
                    $publishBtn.removeClass('able');
                } else if(textareaLength > 0) {
                    $content.find('.textarea-words').html('已输入');
                    $content.find('.textarea-length').removeClass('textarea-over-length').html(textareaLength);
                    $publishBtn.addClass('able');
                }
            }
        }

        function showPop(type, str, valueStr) {
            var number = (str.split(type)).length-2;
            var ajaxData, url, html;
            var span;
            if(valueStr == null) {
                valueStr = '';
            }
            if(type == '@') {
                span = $div.find('span.comment-special-symbol').eq(number);
            } else if(type == '$') {
                span = $div.find('span.comment-special-symbol2').eq(number);
            } else {
                span = $div.find('span.comment-special-symbol3').eq(number);
            }
            var divpos = $div.offset();
            var pos = span.offset();

            $pop.hide();
            if(pos != null) {
                $pop.css({left : (pos.left - divpos.left + 6) + 'px', top : (pos.top - divpos.top + 20) + 'px'});
                $pop.show();

                if(type == '$') {
                    url = _url2;
                    ajaxData = {
                        search: valueStr
                    };
                    html = '<div class="ul-title">输入债券/简称/代码</div>';
                } else if(type == '@') {
                    url = _url;
                    ajaxData = {
                        userName: valueStr
                    };
                    html = '<div class="ul-title">输入昵称或经常@的人</div>';
                } else {
                    url = _url3;
                    ajaxData = {
                        search: valueStr
                    };
                    html = '<div class="ul-title">输入话题</div>';
                }
                if(1) {
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: ajaxData,
                        success: function (data) {
                            if(data.code == '5000') {
                                data = data.data;
                                if(data.items!=null && data.items.length>0) {
                                    if(type == '$') {
                                        $.each(data.items, function(index, item) {
                                            if(item.isBondOrIssuer == 0) {
                                                html += '<div class="ul-item" data-name="sInfoWindcode" data-value="'+item.sInfoWindcode+'">'+item.sInfoName+'</div>';
                                            } else if(item.isBondOrIssuer == 1) {
                                                html += '<div class="ul-item" data-name="issuerId" data-value="'+item.issuerId+'">'+item.sInfoCompname+'</div>';
                                            }
                                        });
                                    } else if(type == '@') {
                                        $.each(data.items, function(index, item) {
                                            // html += '<div class="ul-item">'+item.userName+'</div>';
                                            html += '<div class="ul-item" data-name="userId" data-value="'+item.userId+'">'+item.userName+'</div>';
                                        });
                                    } else {
                                        $.each(data.items, function(index, item) {
                                            // html += '<div class="ul-item">'+item.userName+'</div>';
                                            html += '<div class="ul-item" data-name="id" data-value="'+item.id+'">'+item.themeName+'</div>';
                                        });
                                    }
                                }
                            } else {
                                console.log(url + ':' + data.message);
                            }
                            $(_pop).html(html);
                            $(_pop).show();
                        },
                        error: function (data) {
                            console.log(url + ':' + data.message);
                        }
                    });
                } else {
                    $(_pop).html(html);
                    $(_pop).show();
                }
            }
        }

        $content.off('click', '.ul-item').on('click', '.ul-item', function(e) {
            var $this = $(this);
            var value = $textarea.val();
            var valueArray = value.split('');
            var startNumber = null;
            var replaceNumber = 0;
            var replaceValue = '';
            for (var i = lastEditRange-1; i >= 0; i--) {
                if(valueArray[i] === '@' || valueArray[i] === '$' || valueArray[i] === ' ' || valueArray[i] === '#') {
                    startNumber = i+1;
                    break;
                }
            }
            if(startNumber!=null) {
                replaceNumber = startNumber;
                for(var i=startNumber; i<valueArray.length; i++) {
                    if(valueArray[i] === '@' || valueArray[i] === '$' || valueArray[i] === ' ' || valueArray[i] === '#') {
                        replaceNumber = i;
                        break;
                    } else {
                        valueArray[i] = '';
                    }
                }
                if($this.attr('data-name') == 'userId') {
                    replaceValue = $this.html().trim()+' ';
                } else if($this.attr('data-name') == 'sInfoWindcode') {
                    replaceValue = $this.html().trim() + '(' + $this.attr('data-value') + ')$ ';
                } else if($this.attr('data-name') == 'issuerId') {
                    replaceValue = $this.html().trim() + '$ ';
                } else {
                    replaceValue = $this.html().trim() + '# ';
                }
                valueArray.splice(replaceNumber, 0, replaceValue);
                $textarea.val(valueArray.join(''));
            }
            $pop.hide();
            $textarea.focus();
            countLength();
        });

        // 功能按钮绑定事件
        $insertImg.click(function() {
            var $that = $(this);
            $this.offset();
            var html = '';
            $this.find('.insertImgDiv').show();
            isNull();
            countLength();
        });
        $insertUser.click(function() {
            moveCursor();
            addContent(lastEditRange2, '@');
            lastEditRange2++;
            moveCursor();
            isNull();
            countLength();
        });
        $insertBond.click(function() {
            moveCursor();
            addContent(lastEditRange2, '$');
            lastEditRange2++;
            moveCursor();
            isNull();
            countLength();
        });
        $insertTheme.click(function() {
            moveCursor();
            addContent(lastEditRange2, '#');
            lastEditRange2++;
            moveCursor();
            isNull();
            countLength();
        });
        $publishBtn.click(function() {
            if(!$(this).hasClass('able')) {
                return false;
            }
            var textareaValue = $textarea.val();
            // if(textareaValue != null && textareaValue != '') {
                var tempArr = [];
                var textareaArr = textareaValue.split("\n");
                for(var i=0; i<textareaArr.length; i++) {
                    if(textareaArr[i] != null && textareaArr[i]!='') {
                        tempArr.push(textareaArr[i]);
                    } else {
                        if(!(tempArr[tempArr.length-1] == null || tempArr[tempArr.length-1] == '')) {
                            tempArr.push(textareaArr[i]);
                        }
                        
                    }
                }
                textareaValue = '';
                for(var j=0; j<tempArr.length; j++) {
                    if(tempArr[j] == '') {
                        if(j != tempArr.length-1) {
                            textareaValue += '\n';
                        }
                    } else {
                        textareaValue += tempArr[j]+'\n';
                    }
                }

                if(textareaValue.length > 500) {
                    $publishBtn.removeClass('able');
                    // 没时间改，此处依赖app.js
                    app.alert('录入内容不能超过500字');
                    return false;
                }
                var imagUrlList = [];
                $content.find('.drag_pic_list li.pic .pic-main').each(function(index, item) {
                    if($(item).attr('data-url') != null) {
                        imagUrlList.push($(item).attr('data-url'));
                    }
                });

                var _forward = false;
                var _comment = false;
                var _anonymity = 0;
                if(_isForward == 1) {
                    if(_contentType == 2) {
                        if($('#forword_' + timestamp).is(':checked')) {
                            _comment = true;
                        }
                    } else {
                        if($('#forword_' + timestamp).is(':checked')) {
                            _forward = true;
                        }
                    }
                }
                if($('#anonymity_' + timestamp).is(':checked')) {
                    _anonymity = 1;
                }
                $publishBtn.removeClass('able');

                // 简单防爆破
                var isChange = true;
                var initvalue = $this.find('textarea.comment-textarea').attr('data-initvalue');
                if(initvalue != null) {
                    if(textareaValue.trim()==initvalue.trim()) {
                        isChange = false;
                    }
                }
                var realValue = textareaValue.replace(/\n/g, '').replace(/\s/g, '');
                if((textareaValue != null && textareaValue != '' && realValue.length>0 && isChange) || $content.find('.drag_pic_list li.pic').length > 0) {

                    $.ajax({
                        url: _saveDataUrl,
                        type: 'post',
                        data: {
                            type: 1,
                            content: textareaValue,
                            imagUrlStr: JSON.stringify(imagUrlList),
                            isForWard: _forward,
                            postId: _postId,
                            isComment: _comment,
                            commentId: _commentId,
                            surveyId: _surveyId,
                            isAnonymity: _anonymity
                        },
                        success: function (data) {
                            if(data.code == '5000') {
                                $textarea.val('');
                                $content.find('.drag_pic_list li.pic').remove();
                                countNumer();
                                $content.find('.insertImgDiv').hide();
                                if(successCallBack != null) {
                                    successCallBack(data.data);
                                }
                                // 重新计算textarea高度
                                $textarea.css('height', '40px');
                                $content.find('.textarea-message').hide();
                            } else if(data.code == '3025' || data.code == '3027' || data.code == '3028') {
                                // 没时间改，此处依赖app.js，请重新再app.js中封装一层个性化处理后删除此处代码
                                app.alert(data.message);
                            } else if(data.code == '2007') {
                                // 没时间改，此处依赖app.js，请重新再app.js中封装一层个性化处理后删除此处代码
                                ShowLoginTemp();
                            } else {
                                // console.log(_saveDataUrl + ':' + data.message);
                            }
                        },
                        error: function (data) {
                            // console.log(_saveDataUrl + ':' + data.message);
                        }
                    });
                } else {
                    app.alert('不可发布空白内容');
                }
            // } else {
                // alert('请输入要发布的内容！');
            // }
        });

        // 指定位置添加字符
        function addContent(editRange, replaceValue) {
            var value = $textarea.val();
            var valueArray = value.split('');
            valueArray.splice(editRange, 0, replaceValue);
            $textarea.val(valueArray.join(''));
        }
        // 设置光标
        function moveCursor(){  
            var isIE = !(!document.all);
            var oTextarea = document.getElementById(_edit2);    
            var start = lastEditRange2-0;     
            var end =  lastEditRange2-0;    
            if(isNaN(start)||isNaN(end)){    
                // alert("位置输入错误");
                start = 0;
                end = 0;    
            }    
            if(isIE){    
                var oTextRange = oTextarea.createTextRange();    
                var LStart = start;    
                var LEnd = end;    
                var start = 0;    
                var end = 0;    
                var value = oTextarea.value;    
                for(var i=0; i<value.length && i<LStart; i++){    
                    var c = value.charAt(i);    
                    if(c!='\n'){    
                        start++;    
                    }    
                }    
                for(var i=value.length-1; i>=LEnd && i>=0; i--){    
                    var c = value.charAt(i);    
                    if(c!='\n'){    
                        end++;    
                    }    
                }    
                oTextRange.moveStart('character', start);    
                oTextRange.moveEnd('character', -end);    
                //oTextRange.collapse(true);    
                oTextRange.select();    
                oTextarea.focus();    
            }else{    
                oTextarea.select();    
                // oTextarea.setSelectionRange(start, end);
                oTextarea.selectionStart=start;    
                oTextarea.selectionEnd=end;    
            }    
        }
        // 记录光标最后的位置
        function posCursor(){    
            var start=0,end=0;     
            var isIE = !(!document.all);
            var oTextarea = document.getElementById(_edit2);      
            if(isIE){    
                //selection 当前激活选中区，即高亮文本块，和/或文当中用户可执行某些操作的其它元素。    
                //createRange 从当前文本选中区中创建 TextRange 对象，    
                //或从控件选中区中创建 controlRange 集合。    
                var sTextRange= document.selection.createRange();    
                //判断选中的是不是textarea对象    
                if(sTextRange.parentElement()== oTextarea){    
                    //创建一个TextRange对象    
                    var oTextRange = document.body.createTextRange();    
                    //移动文本范围以便范围的开始和结束位置能够完全包含给定元素的文本。    
                    oTextRange.moveToElementText(oTextarea);    
                    //这里我们比较oTextRange和sTextRange的开头，的到选中区域的开头位置    
                    for (start=0; oTextRange.compareEndPoints("StartToStart", sTextRange) < 0; start++){     
                        oTextRange.moveStart('character', 1);     
                    }    
                    //需要计算一下\n的数目(按字符移动的方式不计\n,所以这里加上)     
                    for (var i = 0; i <= start; i ++){    
                        if (oTextarea.value.charAt(i) == '\n'){     
                            start++;     
                        }    
                    }     
                    //再计算一次结束的位置    
                    oTextRange.moveToElementText(oTextarea);     
                    for (end = 0; oTextRange.compareEndPoints('StartToEnd', sTextRange) < 0; end ++){    
                        oTextRange.moveStart('character', 1);    
                    }    
                    for (var i = 0; i <= end; i ++){    
                        if (oTextarea.value.charAt(i) == '\n'){     
                            end++;     
                        }    
                    }    
                }    
            }else{    
                start = oTextarea.selectionStart;    
                end = oTextarea.selectionEnd;    
            }    
            lastEditRange2 = start;
            lastEditRange2 = end;
            // document.getElementById("start").value = start;     
            // document.getElementById("end").value = end;    
        }  
        // 上传图片
        $content.on('change', '.add_form_input', function() {
            var $file = $(this);
            var $picMain;
            $file.parents('.add_form').ajaxSubmit({
                url: _uploadUrl,
                resetForm: true,
                beforeSubmit: function() {
                    var filePath = $file.val();
                    if(filePath != "") {
                        var fileType = getFileType(filePath);  
                        //判断上传的附件是否为xls,xlsx  
                        if("jpg"!=fileType && "jpeg"!=fileType && "png"!=fileType && "gif"!=fileType){  
                            $file.val("");  
                            alert("请选择jpg/jpeg/png/gif格式的文件"); 
                            return false; 
                        }  
                    } else {
                        // showMessage($dom.importDataExcelMessage, "请选择上传文件！");
                        return false;
                    }
                },
                beforeSend: function() {
                    // $dom.myLoadingPercent.show();
                    var $drag_pic_list = $content.find('.drag_pic_list');

                    if($drag_pic_list.find('li').length >= _maxNumber) {
                        $drag_pic_list.find('li.add').hide();
                    }
                    var html = '';
                    html += '<li class="pic">';
                    html +=     '<div class="pic-main"></div>';
                    html +=     '<span class="picbg"><a class="ico_delpic"></a></span>';
                    html += '</li>';
                    $file.parents('li').before(html);
                    $picMain = $file.parents('li').prev().find('.pic-main');
                    countNumer();
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    //附件上传结束后监控接口实时进程
                    // var percentVal = percentComplete + '%';
                    // $dom.importDataFormPercent.html(percentVal);
                },
                success: function(data) {
                    //成功
                    $picMain.css('background-image', 'url('+data.data[0].fileURL+')');
                    $picMain.attr('data-url', data.data[0].fileURL);
                    isNull();
                },
                error:function(err){
                    // $dom.myLoadingPercent.hide();
                }
            }); 
        }); 
        // 删除已上传图片 
        $content.on('click', '.ico_delpic', function() {
            $(this).parents('li.pic').remove();
            countNumer();
            var $drag_pic_list = $content.find('.drag_pic_list');
            if($drag_pic_list.find('li').length <= _maxNumber) {
                $drag_pic_list.find('li.add').show();
            }
            isNull();
        });
        // 关闭上传图片窗口 
        $content.on('click', '.ficon_close', function() {
            $content.find('.insertImgDiv').hide();
        });
        // 计算已上传图片数量
        function countNumer() {
            var number = $content.find('.drag_pic_list li.pic').length;
            if(number > 0) {
                $content.find('.num_totla').eq(0).html('('+number+')').show();
            } else {
                $content.find('.num_totla').eq(0).hide();
            }
            $content.find('.num_totla').eq(1).html(number);
            $content.find('.num_totla').eq(2).html(_maxNumber-number);
        }
        // 获取上传附件格式
        function getFileType(filePath){  
            var startIndex = filePath.lastIndexOf(".");  
            if(startIndex != -1)  
                return filePath.substring(startIndex+1, filePath.length).toLowerCase();  
            else return "";  
        }  
        // 获取上传附件名称
        function getFileName(filePath){  
            var startIndex = filePath.lastIndexOf("\\");  
            if(startIndex != -1)  
                return filePath.substring(startIndex+1, filePath.length).toLowerCase();  
            else return "";  
        }
        // 检测权限
        function checkUserInfo() {
            $.ajax({
                url: _url4,
                cache: false,
                success: function (data) {
                   if(data.code == 5000) {
                       if(data.data.nickname == "" || data.data.nickname == null){
                           //window.location.href = app.page.unsetup;
                       }
                        if(data.data.registerType == 1) {
                            if(data.data.cardAuthStatus != 2) {
                                // 未验证身份信息
                                $this.find('.comment-mask').html(option.maskMessage).show();
                                $publishBtn.off('click');
                            }
                        } else if(data.data.registerType == 2) {
                            if(data.data.licenceAuthStatus != 2) {
                                // 未验证身份信息
                                $this.find('.comment-mask').html(option.maskMessage2).show();
                                $publishBtn.off('click');
                            }
                        }
                   } else if(data.code == 2007) {
                        // 未登录
                        
                   }

                },
                error: function (data) {
                   

                }
            });
        }
        // 如果是评论或者回复 隐藏上传图片 此处为第一次上线前一天需求临时变更，很气，先不做成可配置
        if(_contentType != 1) {
            $this.find('.insertImg').hide();
        }
    };
})($);
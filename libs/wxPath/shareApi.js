
window.wechat = new Wechat("wx26be12d215d3d8cb");
window.wechatFun = {
    userInfo:{
        openid:'oPOant6-dQScUiPxbY4zO9pxu8y4',
		nickname: 'min4',
		sex: '1',
		province: '广东',
		city: '茂名',
		country: '中国',
		headimgurl: 'http://wx.qlogo.cn/mmopen/vi_32/wDficHnK4YJibpZwYiasdotrG6Jam2icDHCdtI3v5oQuGial2qxG9ymcv76O8iawkSQpm3ed160IicGECqgr1pZooOxXg/0',
		subscribe: 1
    },
    debug:false,
    storageName:"washFruit",
    readyWechat(cb) {
        wx.ready(function(){
            window["musicID"] = document.getElementById("mp3");
            window["musicID"].play();
            alert("微信准备好")
        })
    },
    getOption:function(key){
        var search = location.search;
        if (search == "") return "";
        search = search.slice(1);
        var searchArr = search.split('&');
        for (var i = 0, len = searchArr.length; i < len; i++) {
          var arr = searchArr[i].split('=');
          if (arr[0] == key) {
            return arr[1];
          }
        }
        return "";
    },
    auto:function(cb){
        var _this=this;
        if(this.debug) {
            cb(this.userInfo);
        }else if(!this.debug && this.getOption('debug')=='true') {  //测试环境下，传userInfo
            var localUserInfo = window.localStorage.getItem(this.storageName);
            if(localUserInfo) {
                var _userInfo = JSON.parse(localUserInfo);
                wechat.getSubscribe(_userInfo.openid,function(err,res) {
                    if (err) return alert(err);
                    _userInfo.subscribe = res.subscribe;
                    window.localStorage.setItem(_this.storageName, JSON.stringify(_userInfo));
                    cb(_userInfo);
                })  
            }else {
                //授权模式
                wechat.getUserInfo(function(err, res){  //获取用户的微信个人信息
                    if(err){
                        return wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
                    }
                    wechat.getSubscribe(res.openid, function(err, res2){    //根据用户的微信个人信息获取用户是否已关注公众号
                        if(err){
                            return alert(err);
                        }
                        res.subscribe = res2.subscribe;
                        window.localStorage.setItem(_this.storageName, JSON.stringify(res));
                        cb(res);
                    });
                });
            }
        }else{  //正式环境下，传code
            if(wechat.getQuery('code')) {
                console.log(wechat.getQuery('code'));
                var code = wechat.getQuery('code');
                var codeObj = {"code":code};
                cb(codeObj)
            }else {
                wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter(['code']));
            }
        }
    },
    callBackWechatCode() {
         wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter(['code']));
    },
    getRequestParam:function(url, deleteParam, linkParam) { //参数设置
        var localURL = url;
        var index = url.indexOf("?");
        var singleArray = [];
        var deleteParams = deleteParam ? deleteParam.join() : "";
        var linkParams = linkParam ? linkParam : 0;
        var paramStr = "";
        if (index != -1) {
            var afterurl = url.substr(index + 1);
            var strs = afterurl.split("&");
            for (var i = 0; i < strs.length; i++) { //去重
                if (singleArray.indexOf(strs[i]) == -1) {
                    singleArray.push(strs[i]);
                }
            }
            for (var j = 0; j < singleArray.length; j++) { //删除不需要的
                var paramsName = singleArray[j].split("=")[0];
                var paramsValue = singleArray[j].split("=")[1];
                if (deleteParams.indexOf(paramsName) == -1) {
                    paramStr += paramsName + "=" + paramsValue + "&";
                }

            }
        }
        
        if (linkParams) { //增加参数
            for (var i = 0; i < linkParams.length; i++) {
                paramStr += linkParams[i].name + "=" + linkParams[i].value + "&"
            }
        }
        paramStr = paramStr.substring(0, paramStr.length - 1);                                                                                                       
        return paramStr;                                                                                
    },
    toShare:function(op) {
        var title = op.title;
        var desc = op.desc;
        var imgUrl = op.imgUrl;
        var timeLineTitle = op.timeLineTitle;
        var shareURL = fiboSDK.dealUrl(wechat.filter(['code']));
        wechat.shareFriend({
            appmessageTitle: title,
            appmessageDesc: desc,
            link:shareURL,
            imgUrl:imgUrl
        }, function () {
            console.log("分享好友");
            op.cb();
            try {
                fiboSDK.share('friend');
            } catch (e) { }
        })

        wechat.shareTimeline({
            timelineTitle: timeLineTitle,
            link: shareURL,
            imgUrl:imgUrl
        }, function () {
            console.log("分享朋友圈");
            op.cb();
            try {
                fiboSDK.share('timeline');
            } catch (e) { }
        })
        
    },
    initShare:function(op){
        var _this=this;
        wechat.config();
        this.toShare(op);
        wx.ready(function () {
            _this.toShare(op);
            window["musicID"] = document.getElementById("mp3");
            window["musicID"].play();
        })
    },
    is_weixin:function() {
        var ua = navigator.userAgent.toLowerCase();
        var mes =ua.match(/MicroMessenger/i);
        if (mes == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
}
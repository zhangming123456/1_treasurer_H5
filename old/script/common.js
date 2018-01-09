//服务器地址
//var serverAddress='http://192.168.134.254:8080/zhenler-server/api/';
var serverAddress = 'http://vip.zhenler.com/api';
var version = '2.8.1025';
// var serverAddress = 'http://192.168.134.2:8082/api';
// var serverAddress = 'http://192.168.134.110:8080/zhenler-server/api';
//beforeSend: function(request) {
//           request.setRequestHeader("token", "Chenxizhang");
//       },

(function (window) {
    var QueryString = {
        location: {},
        stringify,
        parse,
        escape: qsEscape,
        queryString(href) {
            href = decodeURIComponent(href);
            if (!href || href.length === 0) {
                if (!location)
                    return;
                href = location.href;
            }
            var url = href.split('#'),
                href_search = url[0].split('?'),
                protocol_host_pathname = href_search[0].split('://'),
                host_pathname = protocol_host_pathname[1].split('/'),
                hostname_post = host_pathname[0].split(':');
            this.location = {
                href: href,
                hash: url[1] ? '#' + url[1] : '',
                host: host_pathname[0] || '',
                hostname: hostname_post[0] || '',
                origin: host_pathname[0] ? (protocol_host_pathname[0] + '://' + host_pathname[0]) : '',
                pathname: host_pathname[1] ? ('/' + host_pathname.slice(1).join('/')) : '',
                port: hostname_post[1] || '',
                protocol: protocol_host_pathname[0] || '',
                search: href_search[1] ? ('?' + href_search[1]) : ''
            };
            return this.location;
        }
    };
    var noEscape = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
        0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, // 32 - 47
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, // 80 - 95
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0  // 112 - 127
    ];

    function qsEscape(str) {
        if (typeof str !== 'string') {
            if (typeof str === 'object')
                str = String(str);
            else
                str += '';
        }
        var out = '';
        var lastPos = 0;

        for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);

            // ASCII
            if (c < 0x80) {
                if (noEscape[c] === 1)
                    continue;
                if (lastPos < i)
                    out += str.slice(lastPos, i);
                lastPos = i + 1;
                out += hexTable[c];
                continue;
            }

            if (lastPos < i)
                out += str.slice(lastPos, i);

            // Multi-byte characters ...
            if (c < 0x800) {
                lastPos = i + 1;
                out += hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)];
                continue;
            }
            if (c < 0xD800 || c >= 0xE000) {
                lastPos = i + 1;
                out += hexTable[0xE0 | (c >> 12)] +
                    hexTable[0x80 | ((c >> 6) & 0x3F)] +
                    hexTable[0x80 | (c & 0x3F)];
                continue;
            }
            // Surrogate pair
            ++i;
            var c2;
            if (i < str.length)
                c2 = str.charCodeAt(i) & 0x3FF;
            else
                throw new URIError('URI malformed');
            lastPos = i + 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | c2);
            out += hexTable[0xF0 | (c >> 18)] +
                hexTable[0x80 | ((c >> 12) & 0x3F)] +
                hexTable[0x80 | ((c >> 6) & 0x3F)] +
                hexTable[0x80 | (c & 0x3F)];
        }
        if (lastPos === 0)
            return str;
        if (lastPos < str.length)
            return out + str.slice(lastPos);
        return out;
    }

    function stringifyPrimitive(v) {
        if (typeof v === 'string')
            return v;
        if (typeof v === 'number' && isFinite(v))
            return '' + v;
        if (typeof v === 'boolean')
            return v ? 'true' : 'false';
        return '';
    }

    function stringify(obj, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';

        var encode = encodeURIComponent;
        if (options && typeof options.encodeURIComponent === 'function') {
            encode = options.encodeURIComponent;
        }

        if (obj !== null && typeof obj === 'object') {
            var keys = Object.keys(obj);
            var len = keys.length;
            var flast = len - 1;
            var fields = '';
            for (var i = 0; i < len; ++i) {
                var k = keys[i];
                var v = obj[k];
                var ks = encode(stringifyPrimitive(k)) + eq;

                if (Array.isArray(v)) {
                    var vlen = v.length;
                    var vlast = vlen - 1;
                    for (var j = 0; j < vlen; ++j) {
                        fields += ks + encode(stringifyPrimitive(v[j]));
                        if (j < vlast)
                            fields += sep;
                    }
                    if (vlen && i < flast)
                        fields += sep;
                } else {
                    fields += ks + encode(stringifyPrimitive(v));
                    if (i < flast)
                        fields += sep;
                }
            }
            return fields;
        }
        return '';
    }

    function parse(url) {
        if (!this.queryString(url))
            return;
        var reg = /([^\?\=\&]+)\=([^\?\=\&]*)/g;
        var obj = {};
        while (reg.exec(this.location.search)) {
            obj[RegExp.$1] = RegExp.$2;
        }
        this.location.query = obj;
        return obj;
    }

    window.QueryString ? (window._QueryString = QueryString) : (window.QueryString = QueryString);

})(window);


//插入md5.js
if ($("#mdClass").length === 0) {
    $("body").append("<script type='text/javascript' src='./script/md5.js'></script>");
}

$("head").append('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />\n' +
    '<meta http-equiv="Pragma" content="no-cache" />\n' +
    '<meta http-equiv="Expires" content="0" />');

var _location = window.location;
var _locationSearch = QueryString.parse(_location.href);
if (!_locationSearch.v || _locationSearch.v !== version) {
    var herf = _location.origin + _location.pathname + '?' + 'v=' + version;
    for (var k in _locationSearch) {
        if (k !== 'v') {
            herf += '&' + k + '=' + _locationSearch[k];
        }
    }
    window.location = herf;
}

//http请求
//var token =getCookie('token')==false?"":getCookie('token');

function httpRequest(type, url, data, callBack, cb) {
    //appId eb86f42f6504bfefe069e85a204c9734
    data = initPay(data);
    if (!url) return;
    $.ajax({
        type: type,
        url: serverAddress + url + "?" + data,
        //contentType: "application/json",
        //header:token,
        contentType: "application/x-www-form-urlencoded",
        //crossDomain: true,
        dataType: "json",
        //beforeSend: function(request) {
        // request.setRequestHeader(token, "token");
        //},
        success: function (data) {
            callBack(data);
            cb && cb(data);
        },
        error: function (data) {
            alert("网络连接失败，或服务器错误");
            cb && cb(data);
        }
    })
}

//时间格式化参数
Date.prototype.Format = function (fmt) { //author: wangzi 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//获取网页传过来的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//Long类型转时间
function datetimeFormat(longTypeDate) {
    var datetimeType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    var m = date.getMinutes();
    if (m < 9) {
        m = "0" + m;
    }
    datetimeType = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + date.getHours() + ":" + m + ":" + date.getSeconds();//yyyy-MM-dd 00:00:00格式日期
    return datetimeType;
}

//1.封装cookie的设置函数
function setCookie(key, value, time) {
    var odate = new Date;
    odate.setDate(odate.getDate() + time);
    document.cookie = key + '=' + escape(value) + ';expires=' + odate;
}

//2.封装cookie的获取函数
function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split('=');
        if (newArr[0] == name) {
            return unescape(newArr[1]);
        }
    }
    return false;
}

//判断resId是否存在
function getResId(name) {
    var resId = getCookie(name);
    if (resId) {
        return resId;
    }
}

//吐丝定時显示
function showToast(message) {
    $("#tipInfo").css("visibility", "visible").find("span").html(message);
    setTime($("#tipInfo"));
}

//吐丝定時清除
function setTime(dom) {
    setTimeout(function () {
        dom.css("visibility", "hidden");
    }, 800)
}

//验证手机号
function checkPhoneNumber(str) {
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    return reg.test(str) ? "" : "请输入正确的手机号码";
}

//验证码时间倒计时
var timer = null;

function setInter(dom) {
    clearInterval(timer);
    var num = 10;
    timer = setInterval(function () {
        if (num == 0) {
            dom.html("重新发送");
            clearInterval(timer);
        } else {
            num--;
            dom.find("span").html(num);
        }
    }, 1000)
}

//验证码格式验证
function checkRegCode(str) {
    var reg = /\d{6}/;
    return reg.test(str) ? "" : "验证码长度不对";
}


//验证身份证号码
function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    alert("身份证号码错误！");
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    alert("身份证号码错误！");
                    return false;
                }
            }
        }
    } else {
        alert("身份证格式不正确!");
        return false;
    }
}

var AND = "&";
var EQUAL = "=";
var QUESTION = "?";

function mergeKeyValue(sb, key, value, format) {
    if (!key || !value) return "";
    sb += key;
    sb += EQUAL;
    if (format) {
        sb += encodeURI(value);
    } else {
        sb += value;
    }
    return sb;
}

function requestParametersMerge(params) {
    if (!params) return null;
    try {
        var sb = "";
        var position = 0;
        for (var key in params) {
            var value = params[key];
            if (value) {
                if (position > 0) {
                    sb += AND;
                }
                sb = mergeKeyValue(sb, key, value);
                position++;
            }
        }
        return sb;
    } catch (e) {
    }
    return null;
}

function sign(secretKey, params) {
    if (!params) return null;
    var keys = new Array();
    for (var key in params) {
        keys.push(key);
    }
    keys.sort();
    var sb = "";
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (params[key] != "" && params[key] != null) {
            sb += key;
            sb += params[key];
        }
    }
    return hex_md5(secretKey + sb);
}

function initPay(params) {
    var a = "261ad12f08f13811298e2b50f803deab";
    if (!params) return null;
    params["signtime"] = Date.parse(new Date()) / 1000;
    params["appId"] = "eb86f42f6504bfefe069e85a204c9734";
    var sign1 = sign(a, params);
    params["signature"] = sign1.toUpperCase();
    params["token"] = getCookie('token');
    return requestParametersMerge(params);
}
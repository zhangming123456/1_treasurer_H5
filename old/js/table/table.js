"use strict";

(function (window, $, mui) {
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    function Table() {
        this.resId = getResId("resId");
        this.handleId = getCookie("shiroUserId");
        this.data = {};
        this.JweixinData = {};
        this.isWeixin = isWeiXin();
        this.tableLeftIndex = 0;
    }

    Table.prototype = {
        constructor: Table,
        /**
         * 加载数据
         */
        load: function (challback) {
            var resId = this.resId, _this = this;
            httpRequest("get", "/table/findTableDtoList", {resId: resId}, function (res) {
                if (res.code == 2000) {
                    _this.data = res.value;
                    challback && challback();
                }
            });
        },
        /**
         * 刷新数据
         */
        refresh: function (index) {
            var _this = this;
            this.tableLeftIndex = index || 0;
            $('#tableLeft').html(' ');
            $('#tableRight').html(' ');
            _this.rendering();
        },
        /**
         * 渲染页面
         * @param challback
         */
        rendering: function (challback) {
            var _this = this;
            if (!this.JweixinData.appId) {
                this.jweixinJSSDKConfig(rending);
            } else {
                rending()
            }

            function isBindRestaurantQRcode(cb) {
                httpRequest("get", "/qrtable/isBindRestaurantQRcode", {resId: _this.resId},
                    function (res) {
                        if (res.code == 2000) {
                            var input = _this.isWeixin ? "" : "<input node-type='jsbridge' type='file' disabled='disabled' name='myPhoto' value='扫描二维码1'/>",
                                btn = "<div class='qr-btn binded' node-type='qr-btn' >解绑" + input + "</div>"
                        } else {
                            var input = _this.isWeixin ? "" : "<input node-type='jsbridge'  type='file' name='myPhoto' value='扫描二维码1'/>",
                                btn = "<div class='qr-btn' node-type='qr-btn'>绑定" + input + "</div>";
                        }
                        $('.tableTop-right').html(btn)
                    },
                    function () {
                        cb && cb()
                    }
                );
            }

            function rending() {
                _this.load(function () {
                    var data = _this.data;

                    for (var i = 0; i < data.length; i++) {
                        if (i == 0) {
                            var html = "<a class='selected'>" + data[i].subareaName + "</a>";
                            var $conitem = $("<div class='tableConItem selected'></div>");
                        } else {
                            var html = "<a>" + data[i].subareaName + "</a>";
                            var $conitem = $("<div class='tableConItem'></div>");
                        }
                        $("#tableLeft").append(html);
                        $("#tableRight").append($conitem);
                        var value = data[i].tableList;
                        for (var j = 0; j < value.length; j++) {
                            if (value[j].isBindQrCode == 1) {
                                var input = _this.isWeixin ? "" : "<input node-type='jsbridge' type='file' disabled='disabled' name='myPhoto' value='扫描二维码1'/>",
                                    btn = "<div class='qr-btn binded' node-type='qr-btn' >解绑" + input + "</div>"
                            } else {
                                var input = _this.isWeixin ? "" : "<input node-type='jsbridge'  type='file' name='myPhoto' value='扫描二维码1'/>",
                                    btn = "<div class='qr-btn' node-type='qr-btn'>绑定" + input + "</div>";
                            }
                            var serialNumber = value[j].isBindQrCode ? value[j].serialNumber : '';
                            var str = "<div class='tableInfo' data-tableid=" + value[j].id + ">"
                                + "<p><span>名称：</span>" + value[j].name + "</p>"
                                + "<p><span>二维码编号：</span>" + serialNumber + "</p>"
                                + "<p><span>桌台编号：</span>" + value[j].tableNo + "</p>"
                                + btn
                                + "</div>";
                            $conitem.append(str);
                        }
                    }
                    isBindRestaurantQRcode(function () {
                        if (!_this.isWeixin) {
                            Qrcode.init($('[node-type=qr-btn]'));
                        }
                        $(".tableLeft").delegate("a", "click", function () {
                            var index = $(this).index();
                            $(this).addClass("selected").siblings("a").removeClass("selected");
                            $(".tableRight .tableConItem").eq(index).addClass("selected").siblings(".tableConItem").removeClass("selected");
                        });
                        $(".tableLeft a").eq(_this.tableLeftIndex).click();
                        challback && challback()
                    });

                })
            }
        },
        jweixinJSSDKConfig: function (challback) {
            var _this = this, flag = true;
            this.getJweixinData(function () {
                if (_this.isWeixin && _this.JweixinData) {
                    var data = _this.JweixinData,
                        jsApiList = [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'playVoice',
                            'onVoicePlayEnd',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ];
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: jsApiList
                    });
                    wx.ready(function (res) {
                        if (flag) {
                            flag = false;
                            challback && challback()
                        }
                    });
                    wx.error(function () {
                        _this.isWeixin = false;
                        if (flag) {
                            flag = false;
                            challback && challback();
                        }
                    });
                } else {
                    _this.isWeixin = false;
                    if (flag) {
                        flag = false;
                        challback && challback()
                    }
                }
            });

        },
        getJweixinData: function (challback) {
            var host = location.host,
                protocol = location.protocol,
                href_first = protocol + '//' + host + '/jweixin',
                api = 'http://vip.zhenler.com/api/wxScanQRcode/',
                // url = encodeURIComponent(location.href.split('#')[0]),
                url = location.href.split('#')[0],
                _this = this,
                data = {
                    url: url
                };
            //        url = encodeURIComponent('http://aaronzm.top');
            var value = null;
            httpRequest("post", "/wxScanQRcode/scan", data, function (data) {
                if (data.returnStatus) {
                    value = _this.JweixinData = data.value;
                } else {

                }
            }, function (res) {
                // mui.toast(res.message);
                challback && challback(value);
            });
            // $.ajax({
            //     type: "GET",
            //     url: api,
            //     data: {url: url},
            //     dataType: "json",
            //     success: function (data) {
            //         _this.JweixinData = data;
            //         challback && challback(data);
            //     }
            // })
        }
    };
    window.Table = Table;
})(window, $, mui)
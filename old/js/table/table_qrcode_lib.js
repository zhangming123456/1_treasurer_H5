$(function () {
    var resId = getResId("resId");
    httpRequest("get", "/table/findTableDtoList", {resId: resId}, function (data) {
        if (data.code == 2000) {
            for (var i = 0; i < data.value.length; i++) {
                if (i == 0) {
                    var html = "<a class='selected'>" + data.value[i].subareaName + "</a>";
                    var $conitem = $("<div class='tableConItem selected'></div>");
                } else {
                    var html = "<a>" + data.value[i].subareaName + "</a>";
                    var $conitem = $("<div class='tableConItem'></div>");
                }

                $("#tableLeft").append(html);
                $("#tableRight").append($conitem);
                var value = data.value[i].tableList;
                for (var j = 0; j < value.length; j++) {
                    if (value[j].isBindQrCode == 1) {
                        var btn = "<div class='qr-btn binded' node-type='qr-btn' >已绑定"
                            + "<input node-type='jsbridge' type='file' disabled='disabled' name='myPhoto' value='扫描二维码1'/></div>"
                    } else {
                        var btn = "<div class='qr-btn' node-type='qr-btn'>绑定"
                            + "<input node-type='jsbridge'  type='file' name='myPhoto' value='扫描二维码1'/></div>"
                    }
                    var str = "<div class='tableInfo' data-tableid=" + value[j].id + ">"
                        + "<p><span>名称：</span>" + value[j].name + "</p>"
                        + "<p><span>是否绑定：</span>" + value[j].isBindQrCode + "</p>"
                        + "<p><span>桌台编号：</span>" + value[j].tableNo + "</p>"
                        + btn
                        + "</div>"
                    $conitem.append(str);
                }
            }
            Qrcode.init($('[node-type=qr-btn]'));
        } else {

        }
    })
    $(".tableLeft").delegate("a", "click", function () {
        var index = $(this).index();
        $(this).addClass("selected").siblings("a").removeClass("selected");
        $(".tableRight .tableConItem").eq(index).addClass("selected").siblings(".tableConItem").removeClass("selected");
    })
    $(".tableLeft a").eq(0).click();

    var tableId, handleId, id, oldId;

    oldId = $("#result-qrcode").val();
    handleId = getCookie("shiroUserId");
    /**
     * 绑定桌台
     */
    $('#tableRight').on("click", ".qr-btn", function () {
        $(".qr-btn").removeClass("selected");
        $(this).addClass("selected");
        tableId = $(this).closest(".tableInfo").attr("data-tableid");
    })
    $(".result-qrcode").bind("blur", function () {
        id = $("#result-qrcode").val();
        httpRequest("post", "/qrtable/bindQRcode", {
            resId: resId,
            id: id,
            tableId: tableId,
            handleId: handleId
        }, function (data) {
            if (data.returnStatus) {
                $(".qr-btn.selected").addClass("binded").text("已绑定");
            } else {
            }
        })
    })
});
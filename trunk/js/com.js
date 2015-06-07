/**
 * Project: yazhisystem
 * Author: fangge
 * Build: 2015/6/4 9:37
 */
$(function () {
    var yzFun = {
        addUrl:function(){
            var txt = '<div class="url-list clearfix"><label for="inputEmail3" class="col-md-3 control-label">宝贝网址：</label>' +
                '<div class="col-md-7">' +
                '<input type="text" class="form-control public-url" id="" placeholder="">' +
                '<a class="delect btn btn-info">移除</a></div></div>';
            $('#add').on('click',function(){
                $('#url-wrap').append(txt);
                $('.delect').on('click',function(){
                    $(this).closest('.url-list').remove();
                })
            })


        },
        init:function(){
            var _this = this;

            $('.carousel').carousel();
            $('#tab').find('a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })

            _this.addUrl()
        }
    }

    yzFun.init();
})
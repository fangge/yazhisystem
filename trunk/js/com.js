/**
 * Project: yazhisystem
 * Author: fangge
 * Build: 2015/6/4 9:37
 */
$(function () {
    var yzFun = {
        timeAni:function(t){
            var curTime = parseInt(new Date().getTime()/1000),
                endTime = parseInt(new Date(t).getTime());
            yzFun.remainTime(endTime,curTime);
        },
        remainTime:function(endtime,curtime){
            var timer = null;
            var d = 24 * 60 * 60,
                h = 60 * 60,
                m = 60;
            endtime = endtime/1000;
            function showTime(){
                curtime = curtime+1;
                var overD = Math.floor((endtime-curtime)/d);
                var overH = Math.floor((endtime-curtime)/h - overD*24);
                var overM = Math.floor((endtime-curtime)/m - overD*24*60 - overH*60);
                var overS = Math.floor((endtime-curtime) - overD*d - overH*h -overM*m);
                if(curtime>=endtime){
                    $('#completeMission').modal('show')
                }else{
                    $('#countdown').text("剩下"+overD+"天"+overH+"时"+overM+"分"+overS+"秒");
                }
            }
            timer = setInterval(showTime,1000);
        },
        addUrl:function(){
            var txt = '<div class="url-list clearfix"><label for="inputEmail3" class="col-md-3 control-label">宝贝网址：</label>' +
                '<div class="col-md-7">' +
                '<input type="text" class="form-control public-url" id="" placeholder="">' +
                '<a class="delect btn btn-info">移除</a></div></div>';
            $('.add').on('click',function(){
                $(this).closest('form').find('.url-wrap').append(txt);
                $('.delect').on('click',function(){
                    $(this).closest('.url-list').remove();
                })
            })
        },
        init:function(){

            var _this = this;
            if($('#countdown').length >0){
                var t =$('#countdown').attr("time").replace(/-/g,"/");
                _this.timeAni(t);
            }


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
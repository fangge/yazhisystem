/**
 * Project: yazhisystem
 * Author: fangge
 * Build: 2015/6/4 9:37
 */
$(function () {
    var yzFun = {
        /**
         * 版头切换
         * @param obj
         * @constructor
         */
        Switch: function(obj){
            //激活
            var _active = function(index){
                    _data.index = index;
                    if (_data.conDoms)
                        _activeDom(index, _data.conDoms);
                    if (_data.imgDoms)
                        _activeImgDom(index, _data.imgDoms);
                    if (_data.btnDoms)
                        _activeDom(index, _data.btnDoms);
                },
            //激活dom
                _activeDom = function(index, dataObj){
                    $.each(dataObj, function(){
                        $.each(this, function(j){
                            if (j != index)
                                $(this).removeClass(_data["class"]);
                            else
                                $(this).addClass(_data["class"]);
                        });
                    })
                },
                _activeImgDom = function(index, dataObj){
                    $.each(dataObj, function(){
                        $.each(this, function(j){
                            if (j != index)
                                $(this).css("zIndex", 1).stop(true,true).animate({'opacity':'0'},_data.speed);
                            else{
                                $(this).css("zIndex", 2).stop(true,true).animate({'opacity':'1'},_data.speed);
                                _data.callBack(j);
                            }
                        });
                    });
                },
                _play = function(){
                    _data.index = (_data.index + 1 >= _data.totalDom) ? 0 : _data.index + 1;
                    timer = setTimeout(function(){
                        _active(_data.index);
                        _play();
                    }, _data.time);
                },
            //bind event
                bindEvent=function(o){
                    $.each(o, function(){
                        $.each(this, function(i){
                            $(this).hover(function(){
                                clearTimeout(timer);
                                _active(i);
                            }, function(){
                                _play();
                            })
                        })
                    });
                },

            //默认值

                _data = {
                    btnDoms: null,
                    imgDoms: null,
                    conDoms: null,
                    //btnEvent: "mouseover",
                    "class": "current",
                    time: 5000,
                    index: 0,
                    totalDom: 0,
                    btnTime:180,
                    speed:400,
                    callBack:function(){}
                },
                btnTimer,
                timer;
            //init
            if (typeof obj != "object") {
                var arg=arguments,
                    chkArgs = function(index){
                        return arg[index] ? [$(arg[index])] : null;
                    };
                _data.btnDoms = chkArgs(0);
                _data.imgDoms = chkArgs(1);
                _data.conDoms = chkArgs(2);
            }
            else {
                $.each(_data, function(i){
                    _data[i] = (obj && obj[i]) ? obj[i] : _data[i];
                });
            }
            _data.totalDom = function(){
                if (_data.imgDoms != null) {
                    return $(_data.imgDoms[0]).length;
                }
                else
                if (_data.btnDoms != null) {
                    return $(_data.btnDoms[0]).length;
                }
                else
                if (_data.conDoms != null)
                    return $(_data.conDoms[0]).length;
            }();

            //bind img event
            if (_data.imgDoms) {
                bindEvent(_data.imgDoms);
            }
            //bind btn event
            if (_data.btnDoms) {
                $.each(_data.btnDoms, function(){
                    $.each(this, function(i){
                        var self = $(this);
                        //href = self.attr("href");
                        //if (self.tagName&&self.tagName.toString().toUpperCase()=="A"&&(href==null||href=="")) self.attr("href","javascript:void(0);");
                        (function(){
                            var overStatus=false;
                            self.hover(function(){
                                overStatus=true;
                                clearTimeout(btnTimer);
                                btnTimer=setTimeout(function(){
                                    //alert(overStatus)
                                    if(overStatus){
                                        clearTimeout(timer);
                                        _active(i);
                                    }
                                },_data.btnTime);
                            },function(){
                                overStatus=false;
                                clearTimeout(btnTimer);
                                clearTimeout(timer);
                                _play();
                            });
                        })();
                    })
                });
            }
            //bind con event
            if (_data.conDoms) {
                bindEvent(_data.conDoms);
            }
            //apply
            _active(_data.index);
            _play();
        },
        /**
         * 重置版头切换高度
         */
        resizeBanner:function(){
            var h = $('#banner-img li').eq(0).find('img').css('height');
            $('.banner-wrap').css('height',h);
        },
        init:function(){
            var _this = this;
            _this.resizeBanner();
            $(window).resize(function(){_this.resizeBanner()})
            for (var i = 0; i < $("#banner-img li").length; i++) {
                $("#banner-nav").append("<li></li>")
            }
            _this.Switch("#banner-nav li", "#banner-img li");
        }
    }

    yzFun.init();
})
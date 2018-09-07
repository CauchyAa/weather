$('#fullpage').fullpage({
    css3:false,//需要把这个值设置为false,以使用easing效果
    navigation:true,
    navigationPosition:'left',
    afterLoad: function(anchorLink, index){
        if(index == 1){
            $(".top_weather").animate({right:'300px'},"easeOutExpo");
            $('video').trigger('play');
        }
        if(index == 2){
            $('#page2').find('#info1').animate({left: '16%'}, 1500, 'easeOutExpo');
            $('#page2').find('#info2').animate({left: '41%'}, 1500, 'easeOutExpo');
            $('#page2').find('#info3').animate({left: '66%'}, 1500, 'easeOutExpo');                   
        }
        if(index == 3){
            $('.download_list').fadeIn(1500);
        }
    },
    onLeave: function(index, direction){
        if(index == 1){
            $(".top_weather").animate({right:'80px'},"easeOutExpo");
        };
        if(index == 2){
            $('#page2').find('.info').animate({left: '-30%'}, 1500, 'easeOutExpo');
        };
        if(index == '3'){
            $('.download_list').fadeOut(1500);
        }
    },
});
                
//隐藏的‘更多’信息
$(".morebutton").mouseenter(function(){
    $(this).css("opacity","1");
    $(".more").animate({right:'0px'},"slow");   
});
$(".more").hover(function(){
    $(this).css("right","0px");
    $(".morebutton").css("opacity","1");
},function(){
    $(this).animate({right:'-140px'},"slow");
    $(".morebutton").css("opacity","0.5");
});
               
//隐藏的天气信息
$(".top_weather").mouseenter(function(){
    $(".expand_weather").animate({top:'-120px'},{duration:1000,easing:'easeOutBounce'});   
    
});
$(".expand_weather").hover(function(){
    $(this).css("top","-120px");
},function(){
    $(this).animate({top:'-520px'},"slow");
});
//悬浮出现二维码
$("#top_qrcode_icon").hover(function(){
    $(".top_qrcode").css("display","block"); 
},function(){
    $(".top_qrcode").css("display","none");  
});
//点击下一页
$(".next").children("img").click(function(){
    $.fn.fullpage.moveSectionDown()
});
                
                
$("#change").click(function(){
    
    var city=$("#input").val();
    //console.log(city);
    $.ajax({
        type:"get",
        //请求地址                   
        url: 'https://sapi.k780.com/?app=weather.future&weaid='+city+'&appkey=36262&sign=8b548a876ba354cf1765f662eeb8d335&format=json&jsoncallback=data',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback : 'data',
        success: function (xhr) {
            //console.log(xhr.result); 
            var res=xhr.result;
            
            $("#top_wea").children("span").text(res[0].citynm);
            $("#top_wea").children("b").text(res[0].temperature);
            $("#top_wea").children("a").text(res[0].weather);
            $("#today_date").text(res[0].days);
            for(var i=0;i<4;i++){
                $('#week_day'+i).text(res[i].week);
                $("#tem_day"+i).text(res[i].temperature);
                
                var date=res[i].days.split("-");
                $("#date_day"+i).text(date[1]+"/"+date[2]);
                
                $("#weather_wea_day"+i).children("img").attr("src",res[i].weather_icon);
                $("#weather_wea_day"+i).children("p").text(res[i].weather);
                $("#weather_wea_day"+i).children("span").text(res[i].wind);
                $("#weather_wea_day"+i).children("b").text(res[i].winp);
            };
            
        },
        error: function (jqXHR) {
            alert("信息错误"+jqXHR.status);
            console.log(jqXHR.responseText);
        }
    });
    if($(".weather").css("display")=="none"){
        $(".weather").css("display","block");
    };
});
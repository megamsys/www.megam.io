$(document).ready(function(){

	$('.backup-tab').hide();
	//virtual office backu tab show hide
	$('#virtual-office-btn').on("click", function(){

		$('.virtual-office-tab').show();
		$('.backup-tab').hide();
        $(this).addClass('active');
        $('#backup-btn').removeClass('active');
	});

	$('#backup-btn').on("click", function(){

		$('.virtual-office-tab').hide();
		$('.backup-tab').show();
        $(this).addClass('active');
        $('#virtual-office-btn').removeClass('active');
	});


	// change menu bg when scroll
	$(window).scroll(function (e) {
        // if ($('#home').length) {
            menuBgScroll();
        // };
    });
    $( window ).resize(function() {
        menuBgScroll();
    });
    menuBgScroll = function(){
        var aheight = $(window).height() / 4;
    	var awidth = $(window).width();

        if( awidth > 769 ){
            if ($(this).scrollTop() >= aheight) {
                $(".top-nav-com .nav").css("margin-top", "30px");
                $(".navbar-brand img").css("margin-top", "0px");
                $(".top-nav-com").css("min-height", "75px");
                 // $(".navbar").animate({paddingTop: "-=20px"},200);
                $(".navbar-default .top-nav-left").css("background-color", "#4f9de6");
                $(".navbar-default .top-nav-right").css("background-color", "#6ed37f");
            }
            else {
                $(".top-nav-com .nav").css("margin-top", "90px");
                 // $(".navbar").animate({paddingTop: "+=40px"},200);
                $(".navbar-brand img").css("margin-top", "55px");
                $(".top-nav-com").css("min-height", "200px");
                $("#home .navbar-default .top-nav-left").css("background-color", "transparent");
                $("#home .navbar-default .top-nav-right").css("background-color", "transparent");
                // $(".navbar-default").css("background-color", "transparent");

            }
        } else {
            $(".navbar-default .top-nav-left").css("background-color", "#4f9de6");
            $(".navbar-default .top-nav-right").css("background-color", "#6ed37f");
            $(".top-nav-com").css("min-height", "0px");
        }
    };
	menuBgScroll();


    autoPlayYouTubeModal();

    //FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
    function autoPlayYouTubeModal() {
        var trigger = $("body").find('[data-toggle="modal"]');
        trigger.click(function () {
            var theModal = $(this).data("target"),
                videoSRC = $(this).attr("data-theVideo"),
                videoSRCauto = videoSRC + "?autoplay=1";
            $(theModal + ' iframe').attr('src', videoSRCauto);
            $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
          });
      });
    }

    $('#box-tb1').show();
    $('.tb-head').on('click', function(){
        console.log( '#box-tb'+ $(this).attr('data-boxIndex') );
        $('.box-tb').hide();
        $('.tb-head').removeClass('active');
        $('#box-tb'+ $(this).attr('data-boxIndex') ).show();
        $(this).addClass('active');

    });

    $('.car1').carousel({
        interval: 3000
    });
    $('.car2').carousel({
        interval: 2500
    });

});
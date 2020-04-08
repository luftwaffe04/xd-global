// ------------------- CONSTANTS AREA -----------------------
const WINDOW_WIDTH = window.innerWidth; // 윈도우의 width 값을 측정하는 변수
const WINDOW_HEIGHT = window.innerHeight; // 윈도우의 height 값을 측정하는 변수
const COMPANY_TOP = 990; // #company의 대략적인 top 값 990
const SECTION_GAP = 100; // section과 section 사이
/////////////////////////////////////// CONSTANTS AREA /////////////


// ------------------- GLOBAL VARIABLE AREA -----------------------
var window_status = 0; // 창 크기에 따라 상태값을 정하는 변수
	// 0 = Desktop, 1 = Tablet, 2 = Mobile
	if (WINDOW_WIDTH<=1023) {
		if (WINDOW_WIDTH<=500) {
			// is_case MOBILE
			window_status = 2;
		} else {
			// is_case TABLET
			window_status = 1;
		} // if()
	} // if()

var last = 970; // 스크롤 이전의 scroll_top값

var arrow_status = 0; // #nav>.button의 상태값을 정하는 변수
	// 0 = 본문으로 이동, 1 = 헤더로 이동

var hover_status = 0; // .dragtip의 상태값을 정하는 변수
	// 0 = 애니메이션이 작동중이지 않음, 1 = 애니메이션이 작동 중

var follow_status = 0; // .follow_btn의 상태값을 정하는 변수
	// 0 = 애니메이션이 작동중이지 않음, 1 = 애니메이션이 작동 중





var NAV_HEIGHT;
var COMPANY_SECTION; // section.#company의 offset().top값을 담을 변수
var SERVICE_SECTION; // section.#service의 offset().top값을 담을 변수
var NEWS_SECTION; // section.#news의 offset().top값을 담을 변수
var RECRUIT_SECTION; // section.#recruit의 offset().top값을 담을 변수
var FOOTER_SECTION; // section.#footer의 offset().top값을 담을 변수

var COM_IMG_WIDTH; // section.about>img의 width()값을 담을 변수
var COM_IMG_HEIGHT; // section.about>img의 height()값을 담을 변수
/////////////////////////////////////////////// GLOBAL VARIABLE AREA




$(window).resize(function(event) {
	/* Act on the event */
	var now_window = window.innerWidth;
	if(WINDOW_WIDTH != now_window) {
		// 윈도우 크기 변경시 새로고침
		location.reload();
	}
});




// ------------------------- SCROLL EVENT --------------------------
$(window).scroll(function() {
	var scroll_top = $(this).scrollTop(); // 스크롤의 위치를 담는 변수

	if (window_status === 0) {
		// #nav를 fixed로 변환
		if(scroll_top>=889) { // 만약 scrollTop이 header 영역을 벗어나면
			$("#nav").css({
				position: "fixed",
				top: 0,
				zIndex: 1000
			});

			$("#company").css({
				marginTop: NAV_HEIGHT+"px"
			});

			// rotate Arrow
			$(".nav_btn img").css({
				transform: "rotate("+180+"deg)",
				transition: "all .4s"
			});
			arrow_status = 1;
			$(".nav_btn img").attr("alt", "헤더로 이동");

			// nav_status에 따른 nav의 슬라이드업/다운
			if(scroll_top>=COMPANY_TOP) { // 만약 scrollTop이 #company 영역을 넘으면
				var scroll_status = isScrolled(scroll_top, last);
				if(scroll_status===0) {
					// Scroll Down Case
					$("#nav").css({
						top: (-NAV_HEIGHT)+"px",
						transition: "top .4s"
					});
					nav_status=1;
				}
				else if(scroll_status===1) {
					// Scroll Up Case
					$("#nav").css({
						top: "0px",
						transition: "top .4s"
					});
					nav_status=0;
				}
				last = scroll_top;
			} // End of nav_status if sentence

		} else if(scroll_top<COMPANY_TOP) { // 만약 scrollTop이 header 영역으로 들어오면
			$("#nav").css({
				position: "relative"
			});
			$("#company").css({
				marginTop: "0px"
			});

			// rotate Arrow
			$(".nav_btn img").css({
				transform: "rotate("+0+"deg)",
				transition: "all .4s"
			});
			arrow_status = 0;
			$(".nav_btn img").attr("alt", "본문으로 이동");
		} // End of if sentence

		// 탭 이동시 메뉴의 색 변화
		if(scroll_top>=COMPANY_SECTION && scroll_top<SERVICE_SECTION){
			// #company 일때
			$("#nav .desktop ul li a").css({
				color: "#003"
			});
			$("#nav .desktop ul li:nth-of-type(1) a").css({
				color: "#f60"
			});
		} else if(scroll_top>=SERVICE_SECTION && scroll_top<NEWS_SECTION){
			// #service 일때
			$("#nav .desktop ul li a").css({
				color: "#003"
			});
			$("#nav .desktop ul li:nth-of-type(2) a").css({
				color: "#f60"
			});
		} else if(scroll_top>=NEWS_SECTION && scroll_top<RECRUIT_SECTION){
			// #news 일때
			$("#nav .desktop ul li a").css({
				color: "#003"
			});
			$("#nav .desktop ul li:nth-of-type(3) a").css({
				color: "#f60"
			});
		} else if(scroll_top>=RECRUIT_SECTION && scroll_top<FOOTER_SECTION){
			// #recruit 일때
			$("#nav .desktop ul li a").css({
				color: "#003"
			});
			$("#nav .desktop ul li:nth-of-type(4) a").css({
				color: "#f60"
			});
		} else {
			$("#nav .desktop ul li a").css({
				color: "#003"
			});

		}
	} // End of Desktop



	// 모바일에서 헤더 로고 영역을 scroll_top이 벗어났을 때 .follow_btn이 보이게 하는 이벤트
	if (window_status === 1 || window_status === 2) {
		if(follow_status === 0 && scroll_top >= 180) {
			follow_status = 1;
			$(".follow_btn").css({
				opacity: 0.7
			});
		}
		if(follow_status === 1 && scroll_top < 180) {
			follow_status = 0;
			$(".follow_btn").css({
				opacity: 0
			});
		}
	}
});
/////////////////////////////////////////////////////// SCROLL EVENT





 // ----------------------- READY EVENT ----------------------------
$(function() {
	// 전역변수 초기화
	NAV_HEIGHT = $("#nav").height();

	init();
	layer_popup();

	COMPANY_SECTION = $("#nav").offset().top;
	SERVICE_SECTION = COMPANY_SECTION + $("#company").height() - SECTION_GAP;
	NEWS_SECTION = SERVICE_SECTION + $("#service").height();
	RECRUIT_SECTION = NEWS_SECTION + $("#news").height();
	FOOTER_SECTION = RECRUIT_SECTION + $("#recruit").height();
	COM_IMG_WIDTH = $("section.about img").width();
	COM_IMG_HEIGHT = $("section.about img").height();

	// MainVisual 자동 슬라이드 backstretch 플러그인
	$("#header").backstretch([
		"./images/main/gf.png",
		"./images/main/al.png",
		"./images/main/hk.png"
		], { duration: 6000, fade: 2000 }
	); // Backstretch



	// [if you want to contact us] 버튼을 클릭했을 때 푸터로 이동하는 이벤트
	$(".header_btn").click(function(event) {
		/* Act on the event */
		if (window_status === 0) { // Desktop 환경일 때
			scrollMove("#footer", 1000);
		}
	}); // Header Button Click Event



	// 모바일에서 따라다니는 메뉴 버튼을 클릭했을 때
	$(".follow_btn").click(function(event) {
		/* Act on the event */
		if(follow_status === 1) {
			if (window_status === 1 || window_status === 2) {
				$("#nav").fadeIn(1000);
				$("body").css({
					overflowY: 'hidden'
				});
				$(".follow_btn").css({
					opacity: 0,
					transition: "opacity 1s"
				});
			}
		}
	});



	// #nav의 항목을 누르면 해당 섹션으로 이동하는 이벤트
	$("#nav ul li a").click(function(event) {
		/* Act on the event */
		event.preventDefault(); // 기본 기능 금지
		var move_to = $(this).attr("href"); // 클릭한 a 태그의 href 정보를 가져와 저장
		scrollMove(move_to, 1000);
	});



	// #nav의 화살표 버튼을 누르면 헤더와 본문을 이동
	$(".nav_btn").click(function(event) { // 화살표를 클릭했을 때
		/* Act on the event */
		if(arrow_status===0) { // 화살표가 아래 방향일 경우
			scrollMove("#nav", 1000);
		}
		else if(arrow_status===1) { // 화살표가 위 방향일 경우
			scrollMove("#header", 1000);
		}
	});



	// #nav의 exit 버튼을 누르면 메뉴가 사라짐
	$(".nav_exit").click(function(event) {
		/* Act on the event */
		event.preventDefault(); // 기본 기능 금지
		if (window_status === 1 || window_status === 2) {
			$("#nav").fadeOut(1000);
			$("body").css({
				overflowY: 'scroll'
			});
			$(".follow_btn").css({
				opacity: 0.7,
				transition: "opacity 1s"
			});
		}
	});



	// #company [Read More] Button을 눌렀을 때
	$(".about_btn").click(function(event) {
		/* Act on the event */
		/*
			버튼을 클릭하면 기존에 있던 글이 사라지고,
			div에 있던 글자들이 나타나고,
			클래스를 about에서 about_more로 바꾸고,
			.about>img의 이미지가 커지고,
			.about_more의 opacity를 다시 1로 한다.
		 */
		event.preventDefault(); // 기본 기능 금지
		$("article.about").stop().animate({
			// 버튼을 클릭하면 기존에 있던 글이 사라지고,
			opacity: 0
		}, 1000, function() {
			// div에 있던 글자들이 나타나고,
			$("article.about div").css({
				display: "block"
			});
			// button을 안보이게 하고
			$(".about_btn").css({
				display: "none"
			});
			// 클래스를 about에서 about_more로 바꾸고,
			$(this).addClass('about_more').removeClass('about');
			// about_more의 크기를 읽어와 세팅
			var this_width = $(".about_more").width();
			var this_height = $(".about_more").height();
			// .about>img의 이미지가 커지고,
			$("section.about img").stop().animate({
				width: this_width+"px",
				height: this_height+"px"
			}, 500);
			// .about_more의 opacity를 다시 1로 한다.
			$(".about_more").stop().animate({
				opacity: 1
			}, 1000);
		});
	});



	// #company [exit] Button을 눌렀을 때
	$(".about_exit").click(function(event) {
		/* Act on the event */
		/*
			버튼을 클릭하면 기존에 있던 글이 사라지고,
			div에 있던 글자들이 사라지고,
			클래스를 about_more에서 about으로 바꾸고,
			.about>img의 이미지가 원래대로 돌아가고,
			article.about의 opacity를 다시 1로 한다.
		 */
		event.preventDefault(); // 기본 기능 금지
		$(".about_more").stop().animate({
			// 버튼을 클릭하면 기존에 있던 글이 사라지고,
			opacity: 0
		}, 1000, function() {
			// div에 있던 글자들이 사라지고,
			$(".about_more>div").css({
				display: "none"
			});
			// button을 보이게 하고
			$(".about_btn").css({
				display: "block"
			});
			// 클래스를 about_more에서 about으로 바꾸고,
			$(this).addClass('about').removeClass('about_more');
			// .about>img의 이미지가 원래대로 돌아가고,
			if(window_status === 0) {
				$("section.about img").stop().animate({
					width: COM_IMG_WIDTH+"px",
					height: COM_IMG_HEIGHT+"px"
				}, 500);
			} else {
				$("section.about img").stop().animate({
					width: "100%",
					height: "100%"
				}, 500);
			}
			// article.about의 opacity를 다시 1로 한다.
			$("article.about").stop().animate({
				opacity: 1
			}, 1000);
		});
	});



	// article.history 드래그 기능
	$("article.history").draggable({
		axis: "x" // x축 고정
	});
	// 드래그 대상에 트랜지션 추가
	$("article.history").css({
		transition: "all .4s ease-out" // x축 고정
	});
	// 이동위치 한계 설정
	$("html, body").bind("mousemove mouseup", function(e) {
		// 움직이는 박스의 현재 left값 알아오기
		var mpos=$("article.history").offset().left;
		// 화면 절반 크기 계산
		var fpoint = $(window).width()/2;
		// 마지막 콘텐츠 한계값
		var lpoint = $("article.history").width()-fpoint;
		// 처음과 마지막 위치값 강제 설정
		if(mpos>fpoint) {
			// 첫번째 고정
			$("article.history").css({
				left: (fpoint/4)+"px"
			});
		}
		else if(mpos<-lpoint) {
			$("article.history").css({
				left: -lpoint+"px"
			});
		}
	});



	// #service의 button 버튼 클릭 시
	$(".service_btn").click(function(event) {
		/* Act on the event */
		event.preventDefault(); // 기본 기능 금지
		var index = $(this).attr("data-index");

		$("#service>.wrap").stop().animate({
			opacity: 0,
			zIndex: 0
		}, 1000, function() {
			$("#service>.wrap").css({
				position: "absolute"
			});
			if(window_status === 2) {
				$("article.more>div.content").css({
					height: (WINDOW_HEIGHT-84)+"px"
				});
				scrollMove("section.more", 500);
			}
			$("section.more ."+index).fadeIn(1000);
			if(window_status === 0 || window_status === 1) {
				switch(index) {
					case 'gf':
						$(".gf .content").prepend('<iframe src="https://www.youtube.com/embed/FCjIBRbApqc?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
						break;
					case 'hk':
						$(".hk .content").prepend('<iframe src="https://www.youtube.com/embed/J1hpFMMOkrQ?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
						break;
					case 'al':
						$(".al .content").prepend('<iframe src="https://www.youtube.com/embed/ojM-qvNxgW4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
						break;
				}
				if(window_status === 1) {
					var iframe_width = $(".more iframe").width();
					$(".more iframe").css({
						height: (iframe_width/2)+"px"
					});
				}
			}
			$(".content>iframe").last().siblings('iframe').remove();
		});


	});

	// #service의 exit 버튼 클릭 시
	$("article.more>.exit").click(function(event) {
		/* Act on the event */
		event.preventDefault();
		var index = $(this).attr("data-index");

		$("section.more ."+index).fadeOut(1000, function() {
			$("#service>.wrap").css({
				position: "relative",
				zIndex: 0
			});
			$("#service>.wrap").stop().animate({
				opacity: 1,
				zIndex: 1
			}, 1000);
			$(".content>iframe").remove();
		});
	});



	// article.history 드래그 기능
	$("section.news").draggable({
		axis: "x" // x축 고정
	});
	// 드래그 대상에 트랜지션 추가
	$("section.news").css({
		transition: "all .4s ease-out" // x축 고정
	});
	// 이동위치 한계 설정
	$("html, body").bind("mousemove mouseup", function(e) {
		// 움직이는 박스의 현재 left값 알아오기
		var mpos=$("section.news").offset().left;
		// 화면 절반 크기 계산
		var fpoint = $(window).width()/2;
		// 마지막 콘텐츠 한계값
		var lpoint = $("section.news").width()-fpoint;
		// 처음과 마지막 위치값 강제 설정
		if(mpos>fpoint) {
			// 첫번째 고정
			$("section.news").css({
				left: (fpoint/4)+"px"
			});
		}
		else if(mpos<-lpoint) {
			$("section.news").css({
				left: -lpoint+"px"
			});
		}
	});


	// recruit의 li a를 클릭했을 때 인덱스 변경
	$(".recruit_btn").click(function(event) {
		/* Act on the event */
		event.preventDefault(); // 기본 기능 금지
		var index = "."+$(this).attr("data-index");
		// console.log(index);
		$(this).parent().siblings('li').removeClass('selected');
		$(this).parent().addClass('selected');
		$("#recruit "+index).siblings('article').stop().css({
			display: "none"
		});
		$("#recruit "+index).fadeIn(800);
		FOOTER_SECTION = RECRUIT_SECTION + $("#recruit").height();
	});

	// .dragtip에 마우스 오버시 애니메이션 이벤트 후 display none
	$(".dragtip").hover(function() {
		/* mouse enters the element */
		if(hover_status === 0) {
			hover_status=1;
			$("img", this).css({
				left: "65%"
			}).stop().delay(500).animate({
				left: "50%"
			}, 1000, function() {
				$(this).parent().fadeOut(1000, function() {
					hover_status=0;
				});
			});
		}
	}, function() {
		/* mouse leaves the element */
		// do nothing...
	});


	// 쿠키 처리
	$(".pop_btn").click(function(event) {
		/* Act on the event */
		event.preventDefault();
		if($(".pop_check").is(":checked")) {
			$.cookie("xdpop", "ok", { expires: 1 });
			// console.log($.cookie('xdpop'));
		}
		$(".popup").fadeOut(600);
	});;


	function init() {
		var section_width;
		var section_height;
		var outer_height;


		// bigger ~ 1200px 반응형 css
		if (window_status === 0) {
			$("#header").css({
				height: (WINDOW_HEIGHT-NAV_HEIGHT)+"px"
			});
			// footer의 크기 자동 설정
			$("#footer .wrap div").css({height: WINDOW_HEIGHT+"px"});
		}

		// 1023px ~ smaller 반응형 css
		if (window_status === 1 || window_status === 2) {
			if(WINDOW_HEIGHT < 450) {
				$("#header").css({
					height: "450px"
				});
			}
			else {
				$("#header").css({
					height: WINDOW_HEIGHT+"px"
				});
			}
		}

		// 1199px ~ 1023px 반응형 css
		if(WINDOW_WIDTH<1200 && WINDOW_WIDTH>1023 ) {
			// #service의 nav.width값 자동 조정
			section_width = (($("section.service").width()-90)/3)-60;
			$("article.service").css({
				width: section_width+"px"
			});

			var section_width = ($("#recruit").width()-232);
			$("article.recruit").css({
				maxWidth: section_width+"px"
			});
		}
	}


	function scrollMove(selector, milisecond) {
		/*
			- Function Name : scrollMove
			- Role : selector의 위치로 milisecond 동안 스크롤 이동 하는 함수
			- Argument :
				selector : 현재 이동할 대상
				milisecond : 이동할 시간
			- Return Value : none
			- Last Modified Date: 2018-05-11
		 */
		var scroll_position = $(selector).offset().top;
		$("html, body").stop().animate({
			scrollTop: scroll_position+"px"
		}, milisecond);
	}

	function layer_popup() {
		if($.cookie("xdpop") === "ok") {
			return false;
		}

		$(".popup").fadeIn(600);
	}
});
//////////////////////////////////////////////////////// READY EVENT




//------------------------ FUNCTION AREA ---------------------------
function isScrolled(current, last) {
	/*
		- Function Name : isScrolled
		- Role : Scroll Up과 Scroll Down을 구별하는 함수
		- Argument :
			current : 현재 scrollTop의 위치
			last : 직전 scrollTop의 위치
		- Return Value :
			0 : Scroll Down Case
			1 : Scroll Up Case
		- Last Modified Date: 2018-05-08
	 */
	if(current>last) // Scroll Down Case
		return 0;
	else if(current<=last) // Scroll Up Case
		return 1;
}
////////////////////////////////////////////////////// FUNCTION AREA